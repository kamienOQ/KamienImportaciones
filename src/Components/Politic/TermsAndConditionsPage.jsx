import React from 'react';
import './styless.css';
import { Typography } from '@mui/material';

const TermsAndConditionsPage = () => {
    const sections = [
        {
            title: 'Información general',
            content: (
                <>
                    Este sitio web es operado por Kamienimportaciones con nombre comercial Kámien. En todo el sitio,
                    los términos “nosotros”, “nos” y “nuestro” se refieren a Kamienimportaciones con nombre comercial
                    Kámien ofrece este sitio web, incluyendo toda la información, herramientas y servicios disponibles
                    para ti en este sitio, el usuario, está condicionado a la aceptación de todos los términos, condiciones,
                    políticas y notificaciones aquí establecidos. <br /> <br />
                    Al visitar nuestro sitio y/o comprar algo de nosotros, participas en nuestro “Servicio” y aceptas los
                    siguientes términos y condiciones (“Términos de Servicio”, “Términos”), incluidos todos los términos y
                    condiciones adicionales y las políticas a las que se hace referencia en el presente documento y/o
                    disponible a través de hipervínculos. Estas Condiciones de Servicio se aplican a todos los usuarios
                    del sitio, incluyendo sin limitación a usuarios que sean navegadores, proveedores, clientes, comerciantes,
                    y/o colaboradores de contenido. <br /> <br />
                    Por favor, lee estos Términos de Servicio cuidadosamente antes de acceder o utilizar nuestro sitio web.
                    Al acceder o utilizar cualquier parte del sitio, estás aceptando los Términos de Servicio. Si no estás de
                    acuerdo con todos los términos y condiciones de este acuerdo, entonces no deberías acceder a la página
                    web o usar cualquiera de los servicios. Si las Términos de Servicio son considerados una oferta,
                    la aceptación está expresamente limitada a estos Términos de Servicio. <br /> <br />
                    Cualquier función nueva o herramienta que se añadan a la tienda actual, también estarán sujetas a
                    los Términos de Servicio. Puedes revisar la versión actualizada de los Términos de Servicio, en cualquier
                    momento en esta página. Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de
                    los Términos de Servicio mediante la publicación de actualizaciones y/o cambios en nuestro sitio web.
                    Es tu responsabilidad chequear esta página periódicamente para verificar cambios.
                    Tu uso continuo o el acceso al sitio web después de la publicación de cualquier cambio constituye
                    la aceptación de dichos cambios.
                </>
            )
        },
        {
            title: 'Sección 1 – Términos de la tienda en línea',
            content:
                (
                    <>
                        Al utilizar este sitio, declaras que tienes al menos la mayoría de la edad en Costa Rica, o que tienes
                        la mayoría de la edad en el país y que nos has dado tu consentimiento para permitir que cualquiera de 
                        tus dependientes menores use este sitio. 
                        <br /> <br />
                        No puedes usar nuestros productos con ningún propósito ilegal o no autorizado tampoco puedes, en el
                        uso del Servicio, violar cualquier ley en tu jurisdicción (incluyendo, pero no limitado a las leyes
                        de derecho de autor).  
                        <br /> <br />
                        No debes transmitir gusanos, virus o cualquier código de naturaleza destructiva. <br />
                        El incumplimiento o violación de cualquiera de estos Términos darán lugar al cese inmediato de
                        tus Servicios.
                    </>
                )
        },
        {
            title: 'Sección 2 – Condiciones generales',
            content:
                (
                    <>
                        Nos reservamos el derecho de rechazar la prestación de servicio a cualquier persona, por cualquier
                        motivo y en cualquier momento. 
                        <br /> <br />
                        Entiendes que tu contenido (sin incluir la información de tu tarjeta de crédito), puede ser
                        transferida sin encriptar e involucrar (a) transmisiones a través de varias redes; y (b) cambios
                        para ajustarse o adaptarse a los requisitos técnicos de conexión de redes o dispositivos.
                        La información de tarjetas de crédito está siempre encriptada durante la transferencia a
                        través de las redes.
                        <br /> <br />
                        Estás de acuerdo con no reproducir, duplicar, copiar, vender, revender o explotar cualquier
                        parte del Servicio, uso del Servicio, o acceso al Servicio o cualquier contacto en el sitio
                        web a través del cual se presta el servicio, sin el expreso permiso por escrito de nuestra parte.
                        <br /> <br />
                        Los títulos utilizados en este acuerdo se incluyen solo por conveniencia y no limita o afecta a
                        estos Términos.
                    </>
                )
        },
        {
            title: 'Sección 3 – Exactitud, exhaustividad y actualidad de la información',
            content: (
                <>
                    ANo nos hacemos responsables si la información disponible en este sitio no es exacta, completa o actual.
                    El material en este sitio es provisto sólo para información general y no debe confiarse en ella o
                    utilizarse como la única base para la toma de decisiones sin consultar, primeramente, información
                    más precisa, completa u oportuna. Cualquier dependencia en la materia de este sitio es bajo su propio
                    riesgo. 
                    <br /> <br />
                    Este sitio puede contener cierta información histórica. La información histórica, no es necesariamente
                    actual y es provista únicamente para tu referencia. Nos reservamos el derecho de modificar los contenidos
                    de este sitio en cualquier momento, pero no tenemos obligación de actualizar cualquier información en
                    nuestro sitio. Aceptas que es tu responsabilidad monitorear los cambios en nuestro sitio.
                </>
            )
        },
        {
            title: 'Sección 4 – Modificaciones al servicio y precios',
            content: (
                <>
                    Los precios de nuestros productos están sujetos a cambio sin aviso. 
                    <br /> <br />
                    Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte del contenido)
                    en cualquier momento sin aviso previo. 
                    <br /> <br />
                    No seremos responsables ante ti o alguna tercera parte por cualquier modificación, cambio de precio,
                    suspensión o discontinuidad del Servicio.
                </>
            )
        },
        {
            title: 'Sección 5 – Productos o servicios',
            content: (
                <>
                    Ciertos productos o servicios pueden estar disponibles exclusivamente en línea a través del sitio web.
                    Estos productos o servicios pueden tener cantidades limitadas y estar sujetas a devolución o cambio de
                    acuerdo con nuestra política de devolución solamente. 
                    <br /> <br />
                    Hemos hecho el esfuerzo de mostrar los colores e imágenes de nuestros productos, en la tienda, con la
                    mayor precisión de colores posible. No podemos garantizar que el monitor de tu computadora, tablet, celular o 
                    dispositivos electrónicos muestren los colores de manera exacta. 
                    <br /> <br />
                    Todos los productos están sujetos a disponibilidad. Las imágenes de los banners son ilustrativas. Estos
                    legales cubren todas las publicaciones hechas en todos los medios. 
                    <br /> <br />
                    Nos reservamos el derecho, pero no estamos obligados, para limitar las ventas de nuestros productos o
                    servicios a cualquier persona, región geográfica o jurisdicción. Podemos ejercer este derecho basados
                    en cada caso. Nos reservamos el derecho de limitar las cantidades de los productos o servicios que ofrecemos.
                    Todas las descripciones de productos o precios de los productos están sujetos a cambios en cualquier momento
                    sin previo aviso, a nuestra sola discreción. Nos reservamos el derecho de discontinuar cualquier producto en
                    cualquier momento. Cualquier oferta de producto o servicio hecho en este sitio es nula donde esté prohibido.
                    <br /> <br /> 
                    No garantizamos que la calidad de los productos, servicios, información u otro material comprado u
                    obtenido por ti cumpla con tus expectativas, o que cualquier error en el Servicio será corregido. 
                    <br /> <br />
                    Kamienimportaciones se compromete a proporcionar los mejores productos que cumplan con nuestros estándares
                    de aseo de la moda, así como cumplir con la más alta seguridad de la salud y los requisitos reglamentarios
                    aplicables relacionados. En el caso de que alguno de nuestros productos no cumpla con los más altos estándares,
                    no nos hacemos responsables de los daños resultantes de la falta de uso o defecto de los productos, y se
                    retirará el producto de nuestro mercado de inmediato.
                </>
            )
        },
        {
            title: 'Sección 6 – Exactitud de facturación e información de cuenta',
            content: (
                <>
                    Nos reservamos el derecho de rechazar cualquier pedido que realice con nosotros. Podemos, a nuestra
                    discreción, limitar o cancelar las cantidades compradas por persona, por hogar o por pedido. Estas
                    restricciones pueden incluir pedidos realizados por o bajo la misma cuenta de cliente, la misma tarjeta de
                    débito/crédito, y/o pedidos que utilizan la misma facturación y/o dirección de envío. 
                    <br /> <br />
                    Precios pueden variar sin previo aviso debido a factores externos: devaluaciones monetarias, alteraciones
                    drásticas en el tipo de cambio, entre otras. 
                    <br /> <br />
                    En el caso de que hagamos un cambio o cancele una orden, podemos intentar notificarle poniéndonos en contacto
                    vía correo electrónico y/o dirección de facturación / número de teléfono proporcionado en el momento que se
                    hizo el pedido. Nos reservamos el derecho de limitar o prohibir las órdenes que, a nuestro juicio, parecen
                    ser colocadas por los concesionarios, revendedores o distribuidores. 
                    <br /> <br />
                    Te comprometes a proporcionar información actual, completa y precisa de la compra y cuenta utilizada para
                    todas las compras realizadas en nuestra tienda. Te comprometes a actualizar rápidamente tu cuenta y otra
                    información, incluyendo tu dirección de correo electrónico y números de tarjetas de crédito y fechas de
                    vencimiento, para que podamos completar tus transacciones y contactarte cuando sea necesario. 
                    <br /> <br />
                    Para más detalles, por favor revisa nuestra Política de Devoluciones, en la sección 18 de este documento.

                </>
            )
        },
        {
            title: 'Sección 7 – Herramientas opcionales',
            content: (
                <>
                    Es posible que te proporcionemos acceso a herramientas de terceros a los cuales no monitoreamos y sobre los
                    que no tenemos control ni entrada. 
                    <br /> <br /> 
                    Reconoces y aceptas que proporcionamos acceso a este tipo de herramientas “tal cual” y “según disponibilidad”
                    sin garantías, representaciones o condiciones de ningún tipo y sin ningún respaldo. No tendremos responsabilidad
                    alguna derivada de o relacionada con tu uso de herramientas proporcionadas por terceras partes. 
                    <br /> <br />
                    Cualquier uso que hagas de las herramientas opcionales que se ofrecen a través del sitio bajo tu propio riesgo
                    y discreción y debes asegurarte de estar familiarizado y aprobar los términos bajo los cuales estas herramientas
                    son proporcionadas por el o los proveedores de terceros. 
                    <br /> <br />
                    También es posible que, en el futuro, te ofrezcamos nuevos servicios y/o características a través del sitio
                    web (incluyendo el lanzamiento de nuevas herramientas y recursos). Estas nuevas características y/o servicios
                    también estarán sujetos a estos Términos de Servicio.
                </>
            )
        },
        {
            title: 'Sección 8 – Enlaces de terceras partes',
            content: (
                <>
                    Cierto contenido, productos y servicios disponibles vía nuestro Servicio puede incluir material de
                    terceras partes. 
                    <br /> <br />
                    Enlaces de terceras partes en este sitio pueden redireccionarse a sitios web de terceras partes que no
                    están afiliadas con nosotros. No nos responsabilizamos de examinar o evaluar el contenido o exactitud y
                    no garantizamos ni tendremos ninguna obligación o responsabilidad por cualquier material de terceros o sitios web,
                    o de cualquier material, productos o servicios de terceros.
                    No nos hacemos responsables de cualquier daño o daños relacionados con la adquisición o utilización de bienes,
                    servicios, recursos, contenidos, o cualquier otra transacción realizada en conexión con sitios web de terceros.
                    <br /> <br />
                    Por favor revisa cuidadosamente las políticas y prácticas de terceros y asegúrate de entenderlas antes de
                    participar en cualquier transacción. Quejas, reclamos, inquietudes o preguntas con respecto a productos de
                    terceros deben ser dirigidas a la tercera parte.
                </>
            )
        },
        {
            title: 'Sección 9 – Comentarios de usuarios, captación y otros envíos',
            content: (
                <>
                    Si, a pedido nuestro, envías ciertas presentaciones específicas (por ejemplo, la participación en concursos) o sin
                    un pedido de nuestra parte envías ideas creativas, sugerencias, proposiciones, planes, u otros materiales, ya sea
                    en línea, por email, por correo postal, o de otra manera (colectivamente, ‘comentarios’), aceptas que podamos, en
                    cualquier momento, sin restricción, editar, copiar, publicar, distribuir, traducir o utilizar por cualquier medio
                    comentarios que nos hayas enviado. No tenemos ni tendremos ninguna obligación (1) de mantener ningún comentario
                    confidencialmente; (2) de pagar compensación por comentarios; o (3) de responder a comentarios. 
                    <br /> <br />
                    Nosotros podemos, pero no tenemos obligación de, monitorear, editar o remover contenido que consideremos sea ilegítimo,
                    ofensivo, amenazante, calumnioso, difamatorio, pornográfico, obsceno u objetable o viole la propiedad intelectual de
                    cualquiera de las partes o los Términos de Servicio. 
                    <br /> <br />
                    Aceptas que tus comentarios no violarán los derechos de terceras partes, incluyendo derechos de autor, marca, privacidad,
                    personalidad u otro derecho personal o de propiedad. Asimismo, aceptas que tus comentarios no contienen material
                    difamatorio o ilegal, abusivo u obsceno, o contienen virus informáticos u otro malware que pudiera, de alguna manera,
                    afectar el funcionamiento del Servicio o de cualquier sitio web relacionado. No puedes utilizar una dirección de
                    correo electrónico falsa, usar otra identidad que no sea legítima, o engañar a terceras partes o a nosotros en cuanto
                    al origen de tus comentarios. Tu eres el único responsable por los comentarios que haces y su precisión. No nos hacemos
                    responsables y no asumimos ninguna obligación con respecto a los comentarios publicados por ti o cualquier tercer parte.
                </>
            )
        },
        {
            title: 'Sección 10 – Información personal',
            content: (
                <>
                    Tu presentación de información personal a través del sitio se rige por nuestra Política de Privacidad.
                    Para ver nuestro Aviso de Privacidad.
                </>
            )
        },
        {
            title: 'Sección 11 – Errores, inexactitudes y omisiones',
            content: (
                <>De vez en cuando puede haber información en nuestro sitio o en el Servicio que contiene errores tipográficos,
                    inexactitudes u omisiones que puedan estar relacionadas con las descripciones de productos, precios, promociones,
                    ofertas, gastos de envío del producto, el tiempo de tránsito y la disponibilidad. Nos reservamos el derecho de
                    corregir los errores, inexactitudes u omisiones y de cambiar o actualizar la información o cancelar pedidos si
                    alguna información en el Servicio o en cualquier sitio web relacionado es inexacta en cualquier momento sin previo
                    aviso (incluso después de que hayas enviado tu orden). 
                    <br /> <br />
                    No asumimos ninguna obligación de actualizar, corregir o aclarar la información en el Servicio o en cualquier
                    sitio web relacionado, incluyendo, sin limitación, la información de precios, excepto cuando sea requerido por
                    la ley. Ninguna especificación actualizada o fecha de actualización aplicada en el Servicio o en cualquier
                    sitio web relacionado, debe ser tomada para indicar que toda la información en el Servicio o en cualquier
                    sitio web relacionado ha sido modificado o actualizado.
                </>
            )
        },
        {
            title: 'Sección 12 – Usos prohibidos',
            content: (
                <>
                    En adición a otras prohibiciones como se establece en los Términos de Servicio, se prohíbe el uso del sitio o
                    su contenido: 
                    <br /> <br />
                    (a) para ningún propósito ilegal; 
                    <br />
                    (b) para pedirle a otros que realicen o participen en actos ilícitos; 
                    <br />
                    (c) para violar cualquier regulación, reglas, leyes internacionales, federales, provinciales o estatales,
                    u ordenanzas locales; 
                    <br />
                    (d) para infringir o violar el derecho de propiedad intelectual nuestro o de terceras partes;
                    <br />
                    (e) para acosar, abusar, insultar, dañar, difamar, calumniar, desprestigiar, intimidar o discriminar por razones
                    de género, orientación sexual, religión, etnia, raza, edad, nacionalidad o discapacidad; 
                    <br />
                    (f) para presentar información falsa o engañosa; 
                    <br />
                    (g) para cargar o transmitir virus o cualquier otro tipo de código malicioso que sea o pueda ser utilizado en 
                    cualquier forma que pueda comprometer la funcionalidad o el funcionamiento del Servicio o de cualquier sitio web 
                    relacionado, otros sitios o Internet; 
                    <br />
                    (h) para recopilar o rastrear información personal de otros; 
                    <br />
                    (i) para generar spam, phish, pharm, pretext, spider, crawl, or scrape; 
                    <br />
                    (j) para cualquier propósito obsceno o inmoral; o 
                    <br />
                    (k) para interferir con o burlar los elementos de seguridad del Servicio o cualquier sitio web relacionado u 
                    otros sitios o Internet. Nos reservamos el derecho de suspender el uso del Servicio o de cualquier sitio web 
                    relacionado por violar cualquiera de los ítems de los usos prohibidos.
                </>
            )
        },
        {
            title: 'Sección 13 – Exclusión de garantías; limitación de responsabilidad',
            content: (
                <>
                    No garantizamos ni aseguramos que el uso de nuestro servicio será ininterrumpido, puntual, seguro o libre de
                    errores. 
                    <br /> <br />
                    No garantizamos que los resultados que se puedan obtener del uso del servicio sean exactos o confiables. 
                    <br /> <br />
                    Aceptas que de vez en cuando podemos quitar el servicio por períodos de tiempo indefinidos o cancelar el servicio
                    en cualquier momento sin previo aviso. 
                    <br /> <br />
                    Aceptas expresamente que el uso de, o la posibilidad de utilizar, el servicio es bajo tu propio riesgo. El
                    servicio y todos los productos y servicios proporcionados a través del servicio son (salvo lo expresamente
                    manifestado por nosotros) proporcionados “tal cual” y “según esté disponible” para su uso, sin ningún tipo de
                    representación, garantías o condiciones de ningún tipo, ya sea expresa o implícita, incluidas todas las garantías
                    o condiciones implícitas de comercialización, calidad comercializable, la aptitud para un propósito particular,
                    durabilidad, título y no infracción. 
                    <br /> <br />
                    En ningún caso Kamienimportaciones, nuestros directores, funcionarios, empleados, afiliados, agentes,
                    contratistas, internos, proveedores, prestadores de servicios o licenciantes serán responsables por cualquier
                    daño, pérdida, reclamo, o daños directos, indirectos, incidentales, punitivos, especiales o consecuentes de
                    cualquier tipo, incluyendo, sin limitación, pérdida de beneficios, pérdida de ingresos, pérdida de ahorros,
                    pérdida de datos, costos de reemplazo, o cualquier daño similar, ya sea basado en contrato, agravio
                    (incluyendo negligencia), responsabilidad estricta o de otra manera, como consecuencia del uso de cualquiera
                    de los servicios o productos adquiridos mediante el servicio, o por cualquier otro reclamo relacionado de alguna
                    manera con el uso del servicio o cualquier producto, incluyendo pero no limitado, a cualquier error u omisión
                    en cualquier contenido, o cualquier pérdida o daño de cualquier tipo incurridos como resultados de la utilización
                    del servicio o cualquier contenido (o producto) publicado, transmitido, o que se pongan a disposición a través
                    del servicio, incluso si se avisa de su posibilidad. Debido a que algunos estados o jurisdicciones no permiten
                    la exclusión o la limitación de responsabilidad por daños consecuenciales o incidentales, en tales estados o
                    jurisdicciones, nuestra responsabilidad se limitará en la medida máxima permitida por la ley.
                </>
            )
        },
        {
            title: 'Sección 14 – Indemnización',
            content: (
                <>
                    Aceptas indemnizar, defender y mantener indemne Kamienimportaciones y nuestras matrices, subsidiarias, afiliados,
                    socios, funcionarios, directores, agentes, contratistas, concesionarios, proveedores de servicios, subcontratistas,
                    proveedores, internos y empleados, de cualquier reclamo o demanda, incluyendo honorarios razonables de abogados,
                    hechos por cualquier tercero a causa o como resultado de tu incumplimiento de las Condiciones de Servicio o de
                    los documentos que incorporan como referencia, o la violación de cualquier ley o de los derechos de un tercero.
                </>
            )
        },
        {
            title: 'Sección 15 – Divisibilidad',
            content: (
                <>
                    En el caso de que se determine que cualquier disposición de estas Condiciones de Servicio sea ilegal, nula o
                    inejecutable, dicha disposición será, no obstante, efectiva a obtener la máxima medida permitida por la ley
                    aplicable, y la parte no exigible se considerará separada de estos Términos de Servicio, dicha determinación no
                    afectará la validez de aplicabilidad de las demás disposiciones restantes.
                </>
            )
        },
        {
            title: 'Sección 16 – Rescisión',
            content: (
                <>
                    Las obligaciones y responsabilidades de las partes que hayan incurrido con anterioridad a la fecha de
                    terminación sobrevivirán a la terminación de este acuerdo a todos los efectos. 
                    <br /> <br />
                    Estas Condiciones de servicio son efectivas a menos que y hasta que sea terminado por ti o nosotros.
                    Puedes terminar estos Términos de Servicio en cualquier momento para avisarnos que ya no deseas utilizar
                    nuestros servicios, o cuando dejes de usar nuestro sitio. 
                    <br /> <br />
                    Si a nuestro juicio, fallas, o se sospecha que ha fallado, en el cumplimiento de cualquier término o
                    disposición de estas Condiciones de Servicio, también podemos terminar este acuerdo en cualquier momento
                    sin previo aviso, y seguirás siendo responsable de todos los montos adeudados hasta incluida la fecha de
                    terminación; y/o en consecuencia podemos negar el acceso a nuestros servicios (o cualquier parte de este).
                </>
            )
        },
        {
            title: 'Sección 17 – Acuerdo completo',
            content: (
                <>
                    Nuestra falla para ejercer o hacer valer cualquier derecho o disposición de estas Condiciones de Servicio no
                    constituirá una renuncia a tal derecho o disposición. 
                    <br /> <br />
                    Estas Condiciones del servicio y las políticas o reglas de operación publicadas por nosotros en este sitio o
                    con respecto al servicio constituyen el acuerdo completo y el entendimiento entre tú y nosotros y rigen el uso
                    del Servicio y reemplaza cualquier acuerdo, comunicaciones y propuestas anteriores o contemporáneas, ya sea
                    oral o escrita, entre tu y nosotros (incluyendo, pero no limitado a, cualquier versión previa de los Términos
                    de Servicio). 
                    <br /> <br />
                    Cualquier ambigüedad en la interpretación de estas Condiciones del servicio no se interpretarán en contra del
                    grupo de redacción.
                </>
            )
        },
        {
            title: 'Sección 18 – Política de devoluciones',
            content: (
                <>
                    Plazo 
                    <br /> <br />
                    Disponemos de un plazo para devoluciones de   a partir de la fecha en que la paquetería entregó tu pedido en el
                    domicilio indicado al realizar la compra. Debes notificar acerca de la devolución antes de que se cumplan los 8 
                    días a través de alguno de nuestros canales de atención: 
                    <br /> <br />
                    Condiciones 
                    <br /> <br />
                    Para ser elegible para una devolución, el artículo debe: 
                    <br /> <br />
                    Si el usuario no está satisfecho con su compra, puede devolver el producto en un plazo de 8 días hábiles a
                    partir de la fecha de entrega. El producto debe estar en las mismas condiciones en que fue recibido, sin usar
                    y en su embalaje original. El usuario es responsable de los costos de envío de la devolución. Una vez que
                    hayamos recibido el producto, proporcionaremos un reembolso completo en un plazo de 8 días hábiles. No se
                    aceptarán devoluciones de productos personalizados o productos que hayan sido usados. 
                    <br /> <br />
                    Hay algunas situaciones donde solo se pueden garantizar reembolsos parciales: 
                    <br /> <br />
                    Si el paquete se pierde durante el envío, haremos todo lo posible para resolver el problema. Si no podemos
                    localizar el paquete, proporcionaremos un reembolso completo al usuario. 
                    <br /> <br />
                    Si deseas hacer la devolución de alguno de nuestros productos, lo puedes hacer de las siguientes maneras: 
                    <br /> <br />
                    - Solicitar la devolución dentro del plazo de 8 días por los medios disponibles: número de teléfono, al 
                    WhatsApp o al correo electrónico. 
                    <br /> <br />
                    Procedimiento 
                    <br /> <br />
                    1. Devolución del dinero (solo aplica para casos de garantía y ley de retracto): 
                    <br /> <br />
                    - A través de transferencia (cuenta de ahorros, cuenta corriente, ahorro a la mano): se realiza aproximadamente
                    dentro de los cinco días hábiles siguientes de recibir el producto nuevamente en nuestra bodega.
                    - Cambio del producto (Sujeto a disponibilidad de inventario en el momento del cambio). Sólo se podrán realizar
                    cambios por productos producto debe estar en las mismas condiciones en que fue recibido, sin usar y en su
                    embalaje original.
                    <br /> <br /> 
                    2. El usuario es responsable de los costos de envío de la devolución.
                    <br /> <br />
                    3. No se aceptarán devoluciones de productos que hayan sido personalizados o productos que hayan sido
                    usados. 
                    <br /> <br /> 
                    Condiciones del producto 
                    <br /> <br />
                    El producto deberá devolverse en óptimas condiciones, sin rastros de haber sido utilizado, con las etiquetas
                    originales o en su defecto, si ya fueron retiradas, debes introducirlas en el empaque. Una vez recibido el
                    producto, verificaremos las condiciones de este y de acuerdo con los resultados, se te enviará un producto
                    nuevo o se procederá con la devolución del dinero. 
                    <br /> <br />
                    Productos que aplican 
                    <br /> <br />
                    Todos los productos aplican para devoluciones siempre y cuando estén sin abrir o sin usar. 
                    <br /> <br />
                    Plazo de respuesta 
                    <br /> <br />
                    Reembolso del dinero: Dependiendo del medio de pago que hayas utilizado para tu compra, el reembolso se hará
                    a través de una transferencia electrónica o a por medio de sinpe móvil. Los cambios se despacharán
                    aproximadamente en 3 días hábiles después de recibido el producto en la bodega y aplicarán los mismos tiempos
                    de una entrega regular. 
                    <br /> <br />
                    Costos de envío 
                    <br /> <br />
                    El Usuario podrá devolver sin ningún costo, cualquier producto que presente defectos de fábrica. Los costos de
                    transporte y los demás que conlleven una devolución por motivos diferentes a defectos de fábrica serán cubiertos
                    por el cliente.
                </>
            )
        },
        {
            title: 'Sección 19 – Ley',
            content: (
                <>
                    Para la interpretación y cumplimiento de los presentes términos y condiciones, las partes se someten a la jurisdicción
                    de los tribunales de la Ciudad de renunciado expresamente a cualquier otro fuero que pudiere corresponderles por razón
                    de sus domicilios presentes o futuros.
                </>
            )
        },
        {
            title: 'Sección 20 – Cambios en los términos de servicio',
            content: (
                <>
                    Puedes revisar la versión más actualizada de los Términos de Servicio en cualquier momento en esta página. 
                    <br /> <br /> 
                    Nos reservamos el derecho, a nuestra sola discreción, de actualizar, modificar o reemplazar cualquier
                    parte de estas Condiciones del servicio mediante la publicación de las actualizaciones y los cambios en nuestro
                    sitio web. Es tu responsabilidad revisar nuestro sitio web periódicamente para verificar los cambios. El uso
                    continuo de o el acceso a nuestro sitio Web o el Servicio después de la publicación de cualquier cambio en
                    estas Condiciones de servicio implica la aceptación de dichos cambios.
                </>
            )
        },
        {
            title: 'Sección 21 – Información de contacto',
            content: (
                <>
                    Preguntas acerca de los Términos de Servicio deben ser enviadas a <strong>kamienoriginalquality@gmail.com</strong>.
                    <br /> <br />
                    Última actualización de este documento de términos y condiciones: 22/04/2024
                </>
            )
        },
    ]
    return (
        <div className='main-terms-and-conditions-container'>
            <div className='terms-and-conditions-container'>
                <div className='terms-and-conditions-title-container'>
                    <Typography variant="h4">Términos y Condiciones</Typography>
                </div>
                <div className='terms-and-conditions-information'>
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h2>{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;
