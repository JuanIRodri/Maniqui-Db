# Maniquí Database 👤

Este proyecto contiene el diseño detallado y los datos iniciales para la base de datos `Maniqui`, un sistema orientado a la gestión y personalización exhaustiva de las características físicas de figuras o personajes.

## Diagrama EER
![Modelo Entidad Relación](./sentencias-sql/Imagen%20Base%20de%20Datos.png)

## Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

*   **sentencias-sql/**: Carpeta raíz de los scripts SQL y documentación visual.
    *   `creaciones.sql`: Definición de tablas, relaciones y restricciones.
    *   `inserciones.sql`: Datos maestros y de ejemplo para pruebas.
    *   `consultas.sql`: Ejemplos de consultas complejas (JOINs).
    *   `vistas.sql`: Capa de abstracción para facilitar el acceso a datos comunes.
    *   `EER Diagram.mwb`: Archivo fuente de MySQL Workbench.

## Modelo de Datos

La base de datos utiliza una arquitectura de **composición jerárquica**, permitiendo una granularidad total en la definición de cada parte del personaje:

### Entidades Principales
| Categoría | Tablas Relacionadas | Atributos Clave |
| :--- | :--- | :--- |
| **Global** | `Personaje` | Altura, Musculatura |
| **Estructura** | `Cuerpo`, `Torso`, `Brazo`, `Pierna` | Tamaño, Forma, Vello, Tipo |
| **Cabeza** | `Cabeza`, `Boca`, `Nariz`, `Cabello`, `Cuernos` | Corte, Tinte, Forma, Cantidad |
| **Detalle Facial** | `Ojos`, `Pestanias`, `Cejas` | Color, Forma, Tinte |

## Vistas Especializadas
Se han incluido vistas para simplificar la obtención de perfiles completos de personajes sin necesidad de escribir múltiples JOINs:
*   **`v_rasgos_basicos`**: Resumen de altura, musculatura y forma de cabeza.
*   **`v_estetica_cabeza`**: Consolidado de rasgos faciales (ojos, cabello, cuernos).
*   **`v_fisico_cuerpo`**: Detalle técnico de torso y extremidades.

## Uso

Para implementar la base de datos:

1.  **Creación**: Ejecute `sentencias-sql/creaciones.sql`. Esto creará el esquema `Maniqui`.
2.  **Carga de datos**: Ejecute `sentencias-sql/inserciones.sql` para tener un entorno de pruebas listo.
3.  **Vistas**: Ejecute `sentencias-sql/vistas.sql` para habilitar las consultas simplificadas.
4.  **Pruebas**: Explore los ejemplos en `sentencias-sql/consultas.sql`.

## Requisitos

*   **Motor**: MariaDB (v11+) o MySQL.
*   **Herramientas**: Cualquier cliente SQL (DBeaver, HeidiSQL, MySQL Workbench).

---
*Este diseño permite que un mismo "Brazo" o "Ojos" puedan ser reutilizados por múltiples cuerpos si se desea crear una biblioteca de partes predefinidas.*
