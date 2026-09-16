# Trabajo Final Integrador - Programacion IV

## Etapa 2: Diseno de wireframes

- **Institucion:** Asociacion "Todos al Agua" (Necochea)
- **Integrantes del Grupo:** Acuña, Marcos, Fort, Lisandro, Luna, Franco

---

## 2.1 Wireframes de todas las pantallas del sitio

Dejamos los bocetos principales para ordenar la estructura del sitio y cumplir con los requerimientos (R1 a R4):

### R1 - Pagina de inicio (Home)

Vista principal para ver de que trata la ONG y entrar rapido a lo importante.

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-11-45-48-image.png)

### R2 - Registro e inicio de sesion

La pantalla para que la gente cree su cuenta o entre con la suya.

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-11-47-51-image.png)
> 
> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-11-48-16-image.png)

### R3 - Areas restringidas

La sección privada que se abre segun rol asignado al usuario cuando inicias sesión para manejar cosas de usuarios, editar perfil propio, anuncios, imagenes, etc.

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-01-58-image.png)
> 
> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-02-56-image.png)
> 
> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-03-22-image.png)
> 
> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-03-52-image.png)

### R4 - Buscador de contenidos

Una pantalla con un buscador para encontrar rapido noticias o info de la organizacion. Actualmente a la fecha correspondiente 16/09 en la pagina principal

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-05-28-image.png)

### Pagina La Cantina

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-29-59-image.png)

### Pagina Flor de Pan

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-31-19-image.png)

### Pagina Guías y CUD

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-33-00-image.png)

---

## 2.2 Mapa de navegacion

![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-32-02-image.png)

Un esquema simple de como se pasa de una pantalla a otra y cuales piden iniciar sesion:

> La página Home es el punto central de navegación. 
> 
> Desde ahí se puede acceder a:
> 
> El Muelle Cantina, que a su vez conecta con:
>     - Cartelera BAM (menú/eventos)
>     - Carta Fija (menú permanente)
>     - Pedidos
> 
> Flor de Pan, que a su vez conecta con:
>     - Panadería Sin TACC (productos sin gluten)
>     - Vivero y Plantines
>     - Puntos de Ventas
> 
> Información y contacto:
> 
> - Guía CUD y Contacto conecta con:
> 
> - Redes Sociales
> 
> Pasos y Requisitos (Instagram / Facebook), conecta con:
> 
> - Selección de Áreas
> - Formulario
> - Flujo de autenticación:
>   
>          - Desde Home sube a Inicio de Sesión
>          - Desde Inicio de Sesión se puede ir a Registrarse
> 
> Al autenticarse, se desbloquean las áreas restringidas:
>     - El Muelle Cantina Área Restringida
>     - Flor de Pan Área Restringida
> 
> Resumen del flujo:
> El sitio tiene un Area principale y sus 2 bifurcaciones 
> 
> (El Muelle Cantina y Flor de Pan), cada una con sus subpáginas. Hay un sistema de login/registro que da acceso a versiones restringidas de ambas áreas y para la del rol de administrador principal, y una sección de contacto e información con formulario y redes sociales.

---

## 2.3 Versión para pantalla angosta

Como se acomoda el diseño para celulares en las cuatro pantallas obligatorias:

### 1. Inicio / Home

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-40-50-image.png)

### 2. El Muelle Cantina

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-41-16-image.png)

### 3. Flor de Pan

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-42-24-image.png)

### 4. Guia CUD y Contacto

> ![](C:/Users/Pc/AppData/Roaming/marktext/images/2026-09-16-12-43-31-image.png)

---

## 2.4 Justificacion de la jerarquia visual de la pagina de inicio

### Análisis de la Versión Laptop (Pantalla Grande)

- **Encabezado:**
  
  - **Ley de Jakob:** Sigue el estándar esperado de navegación donde el logo se sitúa arriba a la izquierda y el menú principal se distribuye a la derecha ("Inicio Sesión", "El Muelle", "Flor de Pan", "CUD / Contacto").
  
  - **Ley de Hick:** El menú cuenta con un número acotado de opciones (cuatro elementos principales), lo que evita saturar al usuario y agiliza su decisión.
  
  - **Proximidad y Similitud:** El buscador (etiqueta y campo de texto con botón "Buscar") utiliza la proximidad y región común para percibirse como una sola molécula funcional.

- **Sección Hero y Unidades Productivas:**
  
  - **Efecto Von Restorff:** En los bloques de contenido se utiliza un único botón principal destacado ("Conoce nuestras unidades" y los botones de llamado a la acción en las tarjetas) por sección visual, evitando la fatiga de múltiples estímulos compitiendo entre sí.
  
  - **Región común:** Las tarjetas de "El muelle cantina" y "Flor de pan" delimitan claramente el contenido mediante contenedores y fondos diferenciados.

### Análisis de la Versión Celular (Pantalla Angosta)

- **Adaptabilidad y Apilamiento:**
  
  - **Proximidad:** En la versión angosta, elementos que en laptop se disponen horizontalmente (como el menú y el buscador) se reordenan y apilan verticalmente. Se gestionan los espacios mediante márgenes para mantener la jerarquía sin necesidad de bordes excesivos.

- **Ley de Fitts en Dispositivos Móviles:**
  
  - Los elementos interactivos principales y los botones de acción se diseñan pensando en el alcance de la mano y un tamaño táctil adecuado para facilitar la interacción en pantallas pequeñas.

### Componentes de Atomic Design Identificados

- **Átomos:** Los botones individuales (ej. "Buscar", "Saber sobre el trámite"), los campos de texto, las etiquetas y el contenedor del logotipo.

- **Moléculas:** El buscador compuesto (campo de texto + botón de búsqueda) y los bloques de tarjetas de las unidades productivas (imagen de marcador + título + botón de acción).

- **Organismos:** El encabezado completo (*Header*) que integra el logo, el buscador y el menú de navegación.

- **Plantilla (Wireframe):** La estructura general en escala de grises de la home tanto para celular como para laptop, definiendo cajas, jerarquías y espacios relativos sin colores ni imágenes definitivas.
