    <?php if(  $valores["config.checked"] == "si"){?> <option value="<?php echo $valores["datos.value"];?>" selected> <?php }else{?> <option value="<?php echo $valores["datos.value"];?>"> <?php }?>          <?php echo $valores["config.label"];?>  </option>