import notify from 'devextreme/ui/notify'
import { custom } from 'devextreme/ui/dialog'
import DevExpress from 'devextreme';

export enum eToastTipo {
    custom = 'custom',
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning'
}

export enum eDialogoBotones {
    ok,
    okCancelar,
    siNo,
    siNoCancelar
}

export enum eDialogoIcono {
    ninguno,
    informacion,
    advertencia,
    error,
    pregunta
}

export enum eDialogoResultado {
    ok = 'ok',
    si = 'si',
    no = 'no',
    cancelar = 'cancelar'
}

export class Dialogo {

    static mostrarToast(mensaje: string, tipo?: eToastTipo, tiempo?: number) {
        notify(mensaje, tipo, tiempo);
    }

    static mostrarToastPersonalizado(options: any, tipo?: eToastTipo, tiempo?: number) {
        notify(options, tipo, tiempo);
    }

    static readonly titulo: string = "DigitalWare";

    private static crearDialogoPersonalizado(mensajeHtml: string, botones: Array<DevExpress.ui.dxButtonOptions>, icono: eDialogoIcono): any {
        let mensajeHtmlDialogo: string;
        if (icono == eDialogoIcono.ninguno)
            mensajeHtmlDialogo = mensajeHtml;
        else {
            let iconoDx: string;
            switch (icono) {
                case eDialogoIcono.informacion:
                    iconoDx = "dx-icon-info";
                    break;
                case eDialogoIcono.advertencia:
                    iconoDx = "dx-icon-warning";
                    break;
                case eDialogoIcono.error:
                    iconoDx = "dx-icon-clear";
                    break;
                case eDialogoIcono.pregunta:
                    iconoDx = "dx-icon-help";
                    break;
            }
            mensajeHtmlDialogo = `<span class="dg-dialogo-icono ${iconoDx}"></span>${mensajeHtml}`;
        }

        let options = {
            title: this.titulo,
            messageHtml: mensajeHtmlDialogo,
            buttons: botones
        };
        return custom(options);
    }

    static obtenerArrayBotones(botones: eDialogoBotones): Array<DevExpress.ui.dxButtonOptions> {
        let botonesDialogo = new Array<DevExpress.ui.dxButtonOptions>();
        switch (botones) {
            case eDialogoBotones.ok:
                botonesDialogo.push(
                    {
                        text: "OK",
                        onClick: () => {
                            return eDialogoResultado.ok;
                        }
                    }
                );
                break;
            case eDialogoBotones.okCancelar:
                botonesDialogo.push(
                    {
                        text: "OK",
                        onClick: () => {
                            return eDialogoResultado.ok;
                        }
                    },
                    {
                        text: "Cancelar",
                        onClick: () => {
                            return eDialogoResultado.cancelar;
                        }
                    }
                );
                break;
            case eDialogoBotones.siNo:
                botonesDialogo.push(
                    {
                        text: "Sí",
                        onClick: () => {
                            return eDialogoResultado.si;
                        }
                    },
                    {
                        text: "No",
                        onClick: () => {
                            return eDialogoResultado.no;
                        }
                    }
                );
                break;
            case eDialogoBotones.siNoCancelar:
                botonesDialogo.push(
                    {
                        text: "Sí",
                        onClick: () => {
                            return eDialogoResultado.si;
                        }
                    },
                    {
                        text: "No",
                        onClick: () => {
                            return eDialogoResultado.no;
                        }
                    },
                    {
                        text: "Cancelar",
                        onClick: () => {
                            return eDialogoResultado.cancelar;
                        }
                    }
                );
                break;
        }
        return botonesDialogo;
    }

    static mostrarDialogo(mensajeHtml: string, botones: eDialogoBotones, icono: eDialogoIcono): Promise<any> & JQueryPromise<any> {
        return this.mostrarDialogoPersonalizado(mensajeHtml, this.obtenerArrayBotones(botones), icono);
    }

    static mostrarDialogoPersonalizado(mensajeHtml: string, botones: Array<DevExpress.ui.dxButtonOptions>, icono: eDialogoIcono): Promise<any> & JQueryPromise<any> {
        return this.crearDialogoPersonalizado(mensajeHtml, botones, icono).show();
    }
  

}

export function obtenerOidMinimo(array: Array<any>): number {
    if (array) {
      if (array.length > 0) {
        let valorMinimo = array.map((value) => {
          return value.idVentas;
        }).reduce((a, b) => {
          return Math.min(a, b);
        });
        if (valorMinimo >= 1)
          return valorMinimo + 1;
        else
          return 1;
      }
      return 1;
    }
  }