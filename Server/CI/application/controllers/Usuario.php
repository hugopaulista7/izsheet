<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {
    function __construct() {
        parent::__construct();
        // $this->load->library('session');
    }
    
    public function Login($dadosRecebidos) {
        var_dump($dadosRecebidos);
    }
}