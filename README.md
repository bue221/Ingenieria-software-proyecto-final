# Ingenieria de software I [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Este repositorio almacena el código fuente del proyecto: AprendeEnLinea.

## Requisitos

Leer toda la documentación antes de iniciar cualquier proceso.

Estudiar y entender:

- [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Styled Components](https://styled-components.com/)
- [Tailwind](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

Tener instalado globalmente:

_Se recomienda tener instalado [homebrew](https://brew.sh/index_es) si se está usando MacOS para instalar todos los paquetes_

- [SourceTree](https://www.sourcetreeapp.com/)
- [Atom](https://atom.io/) o [Visual Studio Code](https://code.visualstudio.com)
- [nvm](https://github.com/creationix/nvm)
- [yarn](https://yarnpkg.com/lang/en/)
- [standard](https://standardjs.com/)
- [prettier](https://prettier.io/docs/en/editors.html/) integrado con el editor o IDE.

## Instalación

Utilizar la versión correcta de NodeJS:

```sh
$ nvm use
```

Al tener la version de node indicada ejecutamos el siguiente comando, también se usa cada vez que se hace pull de la rama _develop_:

```sh
$ yarn
```

--

## Metodología

### Iniciando el desarrollo

Cada nueva funcionalidad debe iniciarse creando un branch con el formato `feature/task-code` partiendo desde el branch _develop_ y cerrando a través de un Pull Request.

### Haciendo un commit

Se usará [commitizen](https://github.com/commitizen/cz-cli) para crear commits productivos y con valor agregado. Cuando se vaya a hacer un commit ejecutar el siguiente comando:

```sh
% git add .
$ yarn commit
```

Seleccionar la opción adecuada.

### Estructura de carpetas en _features_

Esta carpeta es la encargada de contener todo el core de la aplicacion a continuacion se dara un ejemplo de como puede ser utilizada

TIP: En las constants debes tener el schema de _yup_

```
- features
    - epicName
        - components
            - Name.component.tsx
        - constants
            - index.ts
        - containers
            - Name.container.tsx
        - helpers
            - index.ts
        - services
            - name.service.ts
            - index.ts
        - store
            - actions
                - name.actions.ts
                - index.ts
            - reducer
                - name.reducer.ts
                - index.ts
            - selectors
                - name.selector.ts
                - index.ts
        - types
            - index.ts
```

### Estructura de carpetas en _shared_

Esta carpeta es la encargada de contener todos los archivos que se utilizan _globalmente_

```
- shared
    - components
    - constants
    - helpers
    - services
    - store
    - utils
```

### Haciendo un pull request

A través del botón [New pull request](https://github.com/imaginamos/rappi-front-cb/compare) comparar el branch feature que estoy creando con develop, una vez allí rellenar correctamente el template que aparece automáticamente y esperar aprobación.

#### ¿Qué hacer en un Pull Request?

- Cerrar uno o más issues usando el template
- Hacer Pull Request fáciles de comprobar y verificar por parte funcional y de código.

### Malas prácticas en el proyecto

- NO tener _any_ en el código a no ser que sea MUY NECESARIO (Se debera explicar porque existe ese _any_)
- NO crear commits directos en Github.com sin usar el formato descrito anteriormente
- NO escribir URLs directamente en el código
- NO subir imágenes de pruebas
- NO dejar _data_ de prueba en el código
- NO crear commits tipo WIP _(Work in progress)_
- NO crear Pull Request tipo WIP _(Work in progress)_
- NO ignorar reglas de _eslint_
- NO crear _packages_ que no estén aprobados
- NO hacer _push_ sin un apropiado _.gitignore_
- NO ignorar el `yarn.lock` (A menos de que se haga por aprobación)
- NO hacer commits complejos o con demasiados archivos
- NO versionar archivos que pesen más de _10MB_
- NO usar tecnologías que no estén aprobadas
- NO instalar dependencias que no estén aprobadas, siempre solicitar una aprobación vía Slack
- NO crear _branches_ con nombres poco dicientes
- NO escribir variables tipo _foo1, foo2, banner1, banner2_ siempre usar nombres de variables claros y coherentes
