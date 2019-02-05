<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->database('default');
    }
    

    public function Teste($id) {
        $this->db->select('*');
        $this->db->where('id_core_sistema', $id);
        $retornodb = $this->db->get("core_sistema")->result();
        var_dump($retornodb);
    }
}