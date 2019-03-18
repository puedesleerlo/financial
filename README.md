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
- Debe haber un login de usuarios
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

Falta la vista detalle desde la api de cada formulario y los controles de creación y actualización
Quitar validación en formularios condicionales
Deshabilitar formularios dependiendo de la condición (eso incluye quitar la validación)
Crear administración de usuarios

Formularios condicionales
 - El campo debe desaparecer si la condición no se cumple
    - se ejecuta un loop cada vez que el formulario cambia
    - Se evalúa la condición y se buscan los campos de los que depende la condición. 
    Si los campos cambian, se recompila la condición
 - El campo se debe deshabilitar si la condición no se cumple
 - Validación con una condición lógica

 Formularios de varias hojas
  - Condiciones entre formularios de varias hojas ???

- Hay problemas con los formularios condicionales de los formularios condicionales
- Cómo se deshabilita un formArray? D:D:D:D:D:
- Poner clase en las opciones cuando está deshabilitado

- Limitar las opciones y la clase de un campo según reglas predefinidas. Por ejemplo: 

Si controltype es arraymodal, arrayautocomplete o arrayinput es necesario que type sólo pueda ser array o simplearray respectivamente. 

Si controltype es input, type puede ser string, number, range, etc.

option exist!! un campo para option que contiene su condición de existencia! Es decir, además de key value, existe una opción que es exist

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
- Control de compañías
- Terminar de poner la configuración de las preguntas
- Hacer lo de las versiones (cambiar unique name como clave única, pero seguir buscando por unique name,
traer un arreglo con todas las versiones disponibles, pero traer automáticamente la última version )