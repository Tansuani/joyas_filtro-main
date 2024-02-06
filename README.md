# Tienda de Joyas

API REST de una aplicación cliente para satisfacer las necesidades puntuales de sus usuarios de una forma eficiente, mantenible y eficaz.

Crear las variables de entorno:
```
PORT=????

USER_DB=?????????
HOST_DB==?????????
PASSWORD_DB==?????????
NAME_DB==?????????
PORT_DB==????
```

Usar base de datos del archivo **script.sql** en postgre

## mostrar paginado de joyas


`localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC`


## buscar joyas

`http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata`