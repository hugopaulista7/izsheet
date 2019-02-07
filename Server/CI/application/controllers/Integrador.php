<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// require APPPATH . 'libraries/Session/Session.php';

class Integrador extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->library('session');
    }

    public function Integrar() {
        $dadosRecebidos  = $this->ResolverHttp();
        var_dump($dadosRecebidos);
        $retorno = [];
        $retorno['data'] = date("Y-m-d H:m:s");
        switch ($dadosRecebidos->metodo) {
            case 'usuario/Logar':
            $this->incluirArquivoController('Usuario');
            $classController = new Usuario();
            $retorno = $classController->Login($dadosRecebidos);
            break;
        
        }

        echo json_encode($retorno);
    }

    public function ResolverHttp() {
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
    
    private function incluirArquivoController($nomeController) {

        if (!@include($nomeController . ".php")) {
            throw new Exception("Erro ao incluir Controller: " . $nomeController);
        }
    }

}