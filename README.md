# Financial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#Características de la aplicación
- Deben haber roles
- Deben haber compañías
- Un usuario sólo puede ver los formularios de su compañía
- El administrador puede agregar usuarios a su compañía
- Hay un superadministrador que puede acceder a todo
- El superadministrador puede crear compañías
- Hay una tabla que relaciona las compañías con el usuario
- El usuario puede cambiar su compañía
- El administrador puede crear formularios y grupos de formularios
- Los formularios pueden tener campos condicionales y tienen detección de errores personalizada
- Los grupos pueden condicionar la forma en que los formularios se presentan
- funciona en celulares
- Los formularios manejan versiones, cuando un formulario se actualiza, aumenta de versión y siempre se trae la última versión
- Uno puede ver las versiones de los formularios y actualizar un formulario a partir de cualquiera
- Los usuarios pueden ver la última versión de los formularios, llenarlo y mandarlo. 
- o se automatiza la creación de tablas para cada formulario o se mete la información en mongoDB con una colección para cada formulario o una para cada compañía. 


#ToDo

Hay que empezar a pensar en el concepto de views. 
- se puede filtrar la información de una tabla o una gráfica fácilmente.
- Se puede comparar información de distintas tablas (?)
- Se puede segmentar, etc
- Se pueden asignar controles hechos por el usuario para controlar los filtros
- Se pueden hacer botones con acciones

Crear administración de usuarios
- Asegurar la administración!!!!!
 Formularios de varias hojas
  - Condiciones entre formularios de varias hojas ???

- Hay problemas con los formularios condicionales de los formularios condicionales
- Cómo se deshabilita un formArray? D:D:D:D:D: (Desaparece)
- Poner clase en las opciones cuando está deshabilitado

- Limitar las opciones y la clase de un campo según reglas predefinidas. Por ejemplo: 

Si controltype es arraymodal, arrayautocomplete o arrayinput es necesario que type sólo pueda ser array o simplearray respectivamente. 

Si controltype es input, type puede ser string, number, range, etc.



#Cosas para testear

- Se puede crear un formulario sencillo
- Se puede crear un grupo sencillo
- Se puede crear un formulario condicional
- Se puede crear un grupo condicional
- Todas las preguntas se muestran correctamente
- Los usuarios se pueden logear y deslogear
- Se pueden ver todos los formularios y grupos disponibles en la pantalla de inicio
- El administrador puede agregar usuarios y el super administrador compañías
- El superadministrador puede cambiar entre compañías para agregar formularios

Falta por hacer:
- Control de usuarios
- Terminar de poner la configuración de las preguntas
- Hacer lo de las versiones (cambiar unique name como clave única, pero seguir buscando por unique name,
traer un arreglo con todas las versiones disponibles, pero traer automáticamente la última version )

# Ideas para las views

- Puede ser un json que se renderiza. La misma aproximación que en los formularios (tendría la ventaja que Vega también es un Json)
- Las gráficas se hacen con Vega
- Debe ser posible imprimir la hoja o automatizar el proceso
- Debe de haber un lenguaje (como el de Coda) para añadir controles y referencias internas
- Usar Observablehq!!!!! (la saqué del estadio)
