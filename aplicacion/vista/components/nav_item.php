<li class="<?php echo $valores["config.state"]; ?>">    
<?php if(  $valores["config.href"] != NULL){ ?>
<a href="<?php echo $valores["config.href"]; ?>"><?php echo $valores["config.label"]; ?></a>
<?php } else { ?>
<?php echo $valores["config.label"]; ?>
<?php } ?>
</li>