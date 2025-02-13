# EXPENSE TRACKER

## Hecho con Commander y guardado en JSON

- para usar esta aplicación debe tener instalado NODE
- abrir una consola en la ruta donde esté esta aplicación
- usar los comandos enlistados:

### COMANDOS

1) operaciones:
    - --get 
    - --getResumen
    - --getResumenMonth -> necesita un mes, usa: --month o -m, más un número del 1 al 12
    - --add -> necesita --description o -d "tu descripción" y un monto: --amount o -a "precio sin comillas, ej: 34"
    - --update -> lo mismo que add, pero también necesita un id, --id o -i, el id es un número
    - --delete -> necesita el id de lo que quieres eliminar, --id o -i