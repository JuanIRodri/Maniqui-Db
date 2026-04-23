# Maniquí Database

Este proyecto contiene el diseño y los datos iniciales para la base de datos `Maniqui`, orientada a la gestión y personalización de las características físicas de figuras o personajes.

## Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

*   **sentencias-sql/**: Carpeta que contiene los scripts necesarios para la base de datos.
    *   `creaciones.sql`: Define la estructura de las tablas, relaciones y restricciones de integridad.
    *   `inserciones.sql`: Contiene un conjunto de datos iniciales para pruebas y desarrollo.
    *   `consultas.sql`: Consultas de ejemplo para extraer información combinada de las tablas.

## Modelo de Datos

La base de datos está estructurada jerárquicamente para permitir una personalización detallada:

1.  **Personaje**: Entidad principal que agrupa las dimensiones generales.
2.  **Cuerpo y Torso**: Define la estructura física central y las extremidades (`Brazo`, `Pierna`).
3.  **Cabeza**: Centraliza los rasgos faciales y accesorios (`Ojos`, `Boca`, `Nariz`, `Cabello`, `Cuernos`).
4.  **Detalles Faciales**: Tablas específicas para `Pestanias`, `Cejas` y variaciones de forma/color.

## Relaciones y Cardinalidad

El modelo sigue una estructura de composición jerárquica:

*   **Personaje 1:1 Cuerpo**: Cada personaje posee una configuración única de cuerpo (relación `N:1` en base de datos, lógicamente `1:1`).
*   **Cuerpo 1:1 [Brazo, Pierna, Torso, Cabeza]**: El cuerpo es un contenedor que referencia a sus partes fundamentales.
*   **Cabeza 1:1 [Ojos, Cabello, Boca, Nariz, Cuernos]**: La cabeza centraliza todos los rasgos faciales y accesorios superiores.
*   **Ojos 1:1 [Pestanias, Cejas]**: Los ojos definen el marco visual mediante estas dos sub-entidades.
*   **Brazo 1:1 FormaBrazo**: Define la estética y tipo de extremidad superior.

*Nota: En la implementación física, se utilizan relaciones `N:1` mediante claves foráneas (FK) para permitir la reutilización de configuraciones predefinidas de partes entre diferentes personajes.*

## Uso

Para implementar esta base de datos y probar las consultas:

1.  Ejecute el script `sentencias-sql/creaciones.sql` para crear la base de datos `Maniqui` y sus tablas.
2.  Ejecute el script `sentencias-sql/inserciones.sql` para poblar las tablas con los datos de ejemplo.
3.  Utilice el archivo `sentencias-sql/consultas.sql` para ver ejemplos de cómo consultar la información relacionada.

## Requisitos

*   Servidor MariaDB (v11 o superior recomendado) o MySQL.
*   Cliente SQL (HeidiSQL, MySQL Workbench, DBeaver o línea de comandos).
