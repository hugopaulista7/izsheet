<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {
    function __construct() {
        parent::__construct();
        
    }

    public function api() {
        $dadosRecebidos  = $this->ResolverHttp();
        $retorno = [];
        $retorno['data'] = date("Y-m-d H:m:s");
        switch ($dadosRecebidos->metodo) {
            case 'Logar':
            $retorno = $this->Login($dadosRecebidos);
            break;
        
        }

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
            $retorno['item'] = $retornoDb;
            $retorno['mensagem'] = "Usuario logado com sucesso!";
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