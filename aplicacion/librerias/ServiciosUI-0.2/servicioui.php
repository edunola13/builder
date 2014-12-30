<?php
    //$pathThemes= realpath(dirname(__FILE__)) . '/../../source/view/themes/';
    $pathThemes= PATHAPP . '/vista/themes/';
    //$pathJavaScript= realpath(dirname(__FILE__)) . '/../../source/view/javascript/';
    $pathJavaScript= PATHAPP . '/vista/javascript/';
    //$pathComponents= realpath(dirname(__FILE__)) . '/../../source/view/components/';
    $pathComponents= PATHAPP . '/vista/components/';
    
    define('PATH_THEME', $pathThemes);
    define('PATH_JAVASCRIPT', $pathJavaScript);    
    define('PATH_COMPONENT', $pathComponents);
    require 'ApiUi.php';
    require 'Tags.php';
?>
