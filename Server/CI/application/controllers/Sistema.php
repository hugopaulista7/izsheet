<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sistema extends CI_Controller {
    private const ID_ATIVO = 1;
    function __construct() {
        parent::__construct();
        
    }

    public function teste($id) {
        var_dump($id);
    }

    public function api() {
        $dadosRecebidos  = $this->ResolverHttp();

        $retorno = [];

        if (empty($dadosRecebidos->metodo)) {
            $retorno['erro']     = 'Parametros invalidos, sem identificação do metodo destino';
            $retorno['mensagem'] = 'Parametros invalidos, sem identificação do metodo destino';
        } else {
            if (empty($dadosRecebidos->logado)) {
                $retorno['erro']     = 'O usuário precisa estar logado!';
                $retorno['mensagem'] = 'O usuário precisa estar logado!';
            } else {
                try {
                    switch ($dadosRecebidos->metodo) {
                        case 'Listar':
                        $retorno = $this->Listar($dadosRecebidos);
                        break;
                        case 'ListarFichas':
                        $retorno = $this->ListarFichas($dadosRecebidos);
                        break;
                        case 'ListarHabilidades':
                        $retorno = $this->ListarHabilidades($dadosRecebidos);
                        break;
                        case 'ListarArmas':
                        $retorno = $this->ListarArmas($dadosRecebidos);
                        break;
                        case 'ListarArmaduras':
                        $retorno = $this->ListarArmaduras($dadosRecebidos);
                        break;
                        case 'SalvarFicha':
                        $retorno = $this->SalvarFicha($dadosRecebidos);
                        break;
                        
                        default:
                            $retorno['sucesso']  = false;
                            $retorno['erro']     = 'Parametros invalidos, metodo de destino não encontrado';
                            $retorno['mensagem'] = 'Parametros invalidos, metodo de destino não encontrado';
                            break;
                        
                    }
                } catch (Exception $exception) {
                    $retorno['sucsso'] = false;
                    $retorno['erro']     = $dadosRecebidos->metodo . ': ' . $exception->getMessage();
                    $retorno['mensagem'] = $exception->getMessage();
                }
            }
        }
        $retorno['data'] = date("Y-m-d H:i:s");
        

        echo json_encode($retorno);
    }

    private function Listar($dadosRecebidos) {
        if (empty($dadosRecebidos)) {
            throw new Exception("Não é possível listar");
        }

        $this->db->select('*');
        $retornoDb = $this->db->get('core_sistema')->result();

        if (empty($retornoDb)) {
            throw new Exception("Não há nenhum sistema cadastrado no banco de dados");
        }

        $retorno = [];
        $retorno['sucesso'] = true;
        $retorno['item'] = $retornoDb;
        $retorno['mensagem'] = "Sistemas carregados com sucesso";

        return $retorno;
    }

    private function ListarFichas($dadosRecebidos) {
        if (empty($dadosRecebidos)) {
            throw new Exception("Os dados não foram recebidos");
        }

        $this->db->select('*');
        $this->db->where("id_usuario", $dadosRecebidos->logado->id_usuario);
        $this->db->where("id_core_sistema", $dadosRecebidos->dados->idSistema);
        $this->db->where("id_core_status", self::ID_ATIVO);
        $retornoDb = $this->db->get("ficha")->result();

        $retorno = [];
        if (empty($retornoDb)) {
            $retorno['mensagem']  = "Você não tem nenhuma ficha cadastrada para esse sistema, comece a criar suas fichas já!";
        } else {
            $retorno['mensagem'] = "Fichas carregadas com sucesso";
        }

        $retorno['item'] = $retornoDb;
        $retorno['sucesso'] = true;

        return $retorno;


    }

    private function ResolverHttp() {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            }

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }

            exit(0);
        }
        $postData = file_get_contents("php://input");
        
        if (isset($postData)) {
            
            
            return json_decode($postData);
        } else {
            return '{}';
        }
    }

    private function ListarHabilidades($dadosRecebidos) {
        if (empty($dadosRecebidos)) {
            throw new Exception("Dados não recebidos");
        }

        switch ($dadosRecebidos->dados->idSistema) {
            case 1:
            return $this->ListarGot($dadosRecebidos);
            break;

            default:
            throw new Exception("Esse sistema não está cadastrado no nosso banco de dados");
            break;
        } 
    }

    private function ListarArmas($dadosRecebidos) {
        if (empty($dadosRecebidos)) {
            throw new Exception("Dados não recebidos");
        }

        switch ($dadosRecebidos->dados->idSistema) {
            case 1:
            return $this->ListarArmasGot($dadosRecebidos);
            break;

            default:
            throw new Exception("Esse sistema não está cadastrado no nosso banco de dados");
            break;
        } 
    }

    private function ListarArmaduras($dadosRecebidos) {
        if (empty($dadosRecebidos)) {
            throw new Exception("Dados não recebidos");
        }

        switch ($dadosRecebidos->dados->idSistema) {
            case 1:
            return $this->ListarArmadurasGot($dadosRecebidos);
            break;

            default:
            throw new Exception("Esse sistema não está cadastrado no nosso banco de dados");
            break;
        } 
    }


    private function ListarGot($dadosRecebidos) {
        if ($dadosRecebidos->dados->idSistema != 1) {
            throw new Exception("Sistema errado!");
        }

        $this->db->select('*');
        $this->db->where('id_sistema', $dadosRecebidos->dados->idSistema);
        $this->db->order_by('nome', 'ASC');
        $retornoDb = $this->db->get("core_ficha_habilidades_got")->result();
        $retorno = [];
        if (empty($retornoDb)) {
            $retorno['mensagem'] = "Nenhuma habilidade encontrada";
            $retorno['sucesso'] = false;
        } else {
            $retorno['item'] = $retornoDb;
            $retorno['sucesso'] = true;
        }

        return $retorno;

    }

    private function ListarArmasGot($dadosRecebidos) {
        if ($dadosRecebidos->dados->idSistema != 1) {
            throw new Exception("Sistema errado!");
        }

        $this->db->select('*');
        $this->db->order_by('especialidade', 'ASC');
        $retornoDb = $this->db->get('core_got_armas')->result();

        $retorno = [];
        if (empty($retornoDb)) {
            $retorno['mensagem'] = "Nenhuma arma encontrada";
            $retorno['sucesso'] = false;
        } else {
            $retorno['item'] = $retornoDb;
            $retorno['sucesso'] = true;
        }

        return $retorno;
    }

    private function ListarArmadurasGot($dadosRecebidos) {
        if ($dadosRecebidos->dados->idSistema != 1) {
            throw new Exception("Sistema errado!");
        }

        $this->db->select('*');
        $this->db->order_by('nome', 'ASC');
        $retornoDb = $this->db->get('core_got_armaduras')->result();

        $retorno = [];
        if (empty($retornoDb)) {
            $retorno['mensagem'] = "Nenhuma armadura encontrada";
            $retorno['sucesso'] = false;
        } else {
            $retorno['item'] = $retornoDb;
            $retorno['sucesso'] = true;
        }

        return $retorno;
    }

    private function SalvarFicha($dadosRecebidos) {
        if (empty($dadosRecebidos->dados)) {
            throw new Exception("Dados não recebidos");
        }

        if (empty($dadosRecebidos->dados->idSistema)) {
            throw new Exception("Id do sistema está vazio");
        }

        if (empty($dadosRecebidos->dados->ficha)) {
            throw new Exception("Ficha está vazia");
        }

        if (empty($dadosRecebidos->logado->id_usuario)){
            throw new Exception("Id do usuário não recebido");
        }

        $this->db->set('id_usuario', $dadosRecebidos->logado->id_usuario);
        $this->db->set('id_core_sistema', $dadosRecebidos->dados->idSistema);
        $this->db->set('ficha', json_encode($dadosRecebidos->dados->ficha));

        $this->db->set('dt_cadastro', date('Y-m-d H:i:s'));
        $this->db->insert('ficha');

        $retorno = [];
        if ($this->db->affected_rows() > 0 ) {
            $retorno['sucesso'] = true;
            $retorno['mensagem']= 'Ficha cadastrada com sucesso';
        } else {
            $retorno['sucesso'] = false;
            $retorno['mensagem']= 'Ficha não pode ser cadastrada';
        }

        return $retorno;

    }
}