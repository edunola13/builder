
<?php if(  $valores["config.seccion"] == NULL || $valores["config.seccion"] == "cabecera"){ ?>
<nav class="navbar navbar-default" role="navigation">
<div class="navbar-header">
<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
<span class="sr-only">Desplegar navegación</span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
</button>
<a class="navbar-brand" href="<?php echo $valores["config.href"]; ?>"><?php echo $valores["config.logo"]; ?></a>
</div>
<div class="collapse navbar-collapse navbar-ex1-collapse">    
<?php } ?>
      

      
<?php if(  $valores["config.seccion"] == NULL || $valores["config.seccion"] == "pie"){ ?>         
</div></nav>
<?php } ?>
