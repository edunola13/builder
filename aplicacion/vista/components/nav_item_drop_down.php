
<?php if(  $valores["config.seccion"] == NULL || $valores["config.seccion"] == "cabecera"){ ?>
<li class="dropdown <?php echo $valores["config.right"]; ?> <?php echo $valores["config.state"]; ?>">
<a class="dropdown-toggle" data-toggle="dropdown" href="#">
<?php echo $valores["config.label"]; ?> <span class="caret"></span>
</a>
<ul class="dropdown-menu">
<?php } ?>


              
<?php if(  $valores["config.seccion"] == NULL || $valores["config.seccion"] == "pie"){ ?>
</ul></li>
<?php } ?>
