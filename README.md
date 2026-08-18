# Asador Caracoles — reconstrucción estática V1

Primera versión de trabajo para GitHub Pages.

## Decisiones aplicadas
- Código nuevo: HTML + CSS + JS ligero.
- Menú lateral conservado en escritorio; drawer en móvil.
- Blog eliminado.
- Sin formularios de contacto/reserva por ahora.
- Reservas por teléfono.
- ES / EN / FR sin banderas.
- RRSS: TripAdvisor, Facebook e Instagram.
- YouTube no aparece como red social; el canal se usa sólo como repositorio audiovisual.
- TikTok y acceso redundante a Google Maps eliminados.
- Mapa integrado en Contacto.
- Wi-Fi y accesibilidad se conservan como pictogramas informativos.
- Widget/carrusel de reseñas de TripAdvisor eliminado.
- Slider de portada y efectos de profundidad/parallax reconstruidos sin dependencias de Duda.

## Pendiente para siguientes versiones
- Confirmar los IDs exactos de los vídeos que se quieren destacar y sustituir el playlist provisional por vídeos concretos.
- Revisar material fotográfico original disponible en Duda y sustituir capturas/recursos de menor resolución cuando existan originales.
- Revisar horarios y contenido final con el restaurante antes de publicar en el dominio real.


## Versión 11 · navegación y reservas simplificadas
- Navegación principal: Asador Caracoles · Carta & Vinos · Eventos · Reservas.
- “Reservas” usa `contacto.html` como destino único de reservas y contacto.
- Inicio: queda un único CTA “Reservas”; se elimina el CTA redundante de reserva de bodega.
- Eliminada la página independiente `reservas.html` (y su versión inglesa).
- Eliminada la antigua página Galería (y su versión inglesa); el vídeo Andaluces X España permanece en el footer común.
- Eventos mantiene la bodega como contenido propio, sin crear recorridos de reserva redundantes.
- Footer común: vídeo Andaluces X España con miniatura local y carga diferida vía youtube-nocookie.com.
- Fondo intermedio unificado en #f7f7f5.


## Versión 18 · limpieza y proporciones desktop
- Menú lateral desktop reequilibrado: logo ligeramente más bajo, tipografía un poco mayor, más aire en el activo, idiomas y RRSS descendidos de forma moderada.
- Reservas mantiene el fondo intermedio `#f7f7f5`.
- Eliminados `404.html`, `historia.html` y `en/historia.html`.
- Retiradas del CSS las reglas heredadas que sólo daban servicio a esas páginas.
- Aviso Legal completado de forma discreta con los datos societarios de FONDA CARACOLES SL y correo de contacto.
- Favicon preparado a partir del símbolo actual (arco + llama, sin texto) en ICO/PNG y Apple Touch Icon.

## Versión 19 · imágenes, Carta y parallax
- La fotografía de carnes rojas queda en un único archivo `index-esencias-carnes-rojas-parrilla.webp`, optimizado a 500×500 px (~82 KB); eliminado el duplicado de ~4 MB.
- La foto de carnes rojas se mantiene para “Esencias de temporada”, pero se retira del slider de Carta & Vinos (ES/EN).
- Parallax de Carta & Vinos y Eventos sustituido por una implementación CSS de `background-attachment: fixed` en desktop; en móvil vuelve a scroll normal por compatibilidad.
- Eventos mantiene su portada sin oscurecimiento; Carta & Vinos conserva overlay negro al 50%.
- El sello Travellers' Choice 2022 del footer enlaza a la ficha de Asador Caracoles en TripAdvisor.
- Eliminado el recurso huérfano `historia-hero.jpg` tras la retirada de la página Historia.


## Versión FR · 2026-08-18
- Añadida versión francesa completa en `/fr/`, reutilizando CSS, JS e imágenes comunes.
- Selector de idiomas unificado: ES · EN · FR en desktop y mobile.
- Los documentos franceses se esperan en `assets/cartas/menu-fr.pdf` y `assets/cartas/carte-des-vins-fr.pdf`.
