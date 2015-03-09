# Builder HTML - Servicios UI

El Builder HTML se encuentra desarrollado sobre PHP utilizando el Framework Enola PHP y la librería de servicios UI. 
Aunque esta está hecha sobre PHP casi todo su comportamiento está del lado del cliente en el lenguaje Java Script.

Mediante JQuery y Ajax la aplicación se comunica con el Servidor UI. En cada comunicación se le pasa al servidor la
configuración del componente y el servidor devuelve el componente listo para imprimir en HTML.

El Builder HTML permitirá a un usuario armar su propia UI mediante los componentes definidos en 
el Servidor UI y otras opciones que provee el Builder. Las otras opciones son las filas provistas por 
Bootstrap lo cual nos facilita el maquetado de los componentes.

El usuario podrá ir agregando componentes, eliminarlos, moverlos de lugar y cambiar su configuración.

Si el usuario realiza un cambio de configuración según el cambio se modifica directamente en Java 
Script el componente o se le solicita nuevamente el componente al servidor con la nueva 
configuración.

Una vez que el usuario termina su maquetado tendrá la posibilidad de descargar el código HTML 
con las CSS y Java Scripts asociados. Además de esto tendrá la posibilidad de guardar el modelo, 
en caso de que no haya terminado de maquetar y desee continuar otro día.

Para mas Información: http://www.edunola.com.ar/builder
