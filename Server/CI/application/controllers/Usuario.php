<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {
    function __construct() {
        parent::__construct();
        
    }

    public function api() {
        $dadosRecebidos  = $this->ResolverHttp();

        $retorno = [];

        if (empty($dadosRecebidos->metodo)) {
            $retorno['erro']     = 'Parametros invalidos, sem identificação do metodo destino';
            $retorno['mensagem'] = 'Parametros invalidos, sem identificação do metodo destino';
        } else {
            
            try {
                switch ($dadosRecebidos->metodo) {
                    case 'Logar':
                    $retorno = $this->Login($dadosRecebidos);
                    break;
                    
                    case 'Cadastrar':
                    $retorno = $this->Cadastrar($dadosRecebidos);
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
        $retorno['data'] = date("Y-m-d H:i:s");
        

        echo json_encode($retorno);
    }
    
    private function Login($dadosRecebidos) {
        if (empty($dadosRecebidos->dados)) {
            throw new Exception("Dados de login não recebidos");
        }

        $this->db->select('*');
        $this->db->where("nome_usuario", trim(strtolower($dadosRecebidos->dados->nomeUsuario)));
        $this->db->where("senha", md5(trim($dadosRecebidos->dados->senha)));
        $retornoDb = $this->db->get("usuario")->row(0);
        $retorno = [];

        if(empty($retornoDb)) {
            $retorno['sucesso'] = false;
            $retorno['mensagem'] = "Não há um usuário cadastrado com esse nome, faça já o seu cadastro";
        } else {
            $retorno['sucesso']=true;
            $retorno['item'] = $this->FormatarUsuario($retornoDb);
            $retorno['mensagem'] = "Usuario logado com sucesso!";
        }


        return $retorno;
    }


    private function FormatarUsuario($usuario) {
        if (empty($usuario)) {
            throw new Exception("Não é possível formatar o usuário");
        }
        //$usuario->imagem = $this->ListarImagem($dadosRecebidos);
        $usuario->senha = '*************';
        
        return $usuario;
    }

    private function ValidarEmail($email) {
        $this->db->select('*');
        $this->db->where("email", $email);
        $retornoDb = $this->db->get("usuario")->row(0);

        if (!empty($retornoDb)) {
            throw new Exception("Já existe um usuario com esse email cadastrado");
        }
        return true;
    }

    private function ValidarUsuario($nomeUsuario) {
        $this->db->select('*');
        $this->db->where("nome_usuario", $nomeUsuario);
        $retornoDb = $this->db->get('usuario')->row(0);

        if (!empty($retornoDb)) {
            throw new Exception("O nome de usuário já está cadastrado");
        }

        return true;
    }

    private function Cadastrar($dadosRecebidos) {
        if (empty($dadosRecebidos)) {
            throw new Exception("Dados não recebidos");
        }

        $this->ValidarEmail($dadosRecebidos->dados->email);
        $this->ValidarUsuario($dadosRecebidos->dados->nomeUsuario);

        $this->db->set("nome_completo", $dadosRecebidos->dados->nomeCompleto);
        $this->db->set("email", trim(strtolower($dadosRecebidos->dados->email)));
        $this->db->set("senha", md5(trim($dadosRecebidos->dados->senha)));
        $this->db->set("nome_usuario", trim($dadosRecebidos->dados->nomeUsuario));

        $this->db->set("dt_cadastro", date("Y-m-d H:m:s"));
        $this->db->insert("usuario");

        $idUsuario = $this->db->insert_id();
        $retorno = [];
        if (empty($idUsuario)) {
            throw new Exception("Ocorreu um erro ao cadastrar o usuario");
        }

        if($this->db->affected_rows() > 0 ){
            $retorno['sucesso'] = true;
            $dadosRecebidos->dados->idUsuario = $idUsuario;
            $retorno['item'] = $this->FormatarUsuario($dadosRecebidos->dados);
            $retorno['mensagem'] = "Usuario cadastrado com sucesso";
        } else {
            $retorno['sucesso'] = false;
            $retorno['mensagem'] = "Não foi possível cadastrar o usuario";
        }

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
}