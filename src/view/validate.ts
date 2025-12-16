interface QRViewProps {
  valid: boolean;
  data: {
    loanId: string;
    customerSurName: string;
    customerName: string;
    originalAmount: number;
    firstQuotaDate: string;
    identification: string
  };
}


export function renderQRView({ valid, data }: QRViewProps): string {
  const fullName = `${data.customerName} ${data.customerSurName}`;
  const amountFormatted = new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  }).format(data.originalAmount);
  const dateFormatted = data.firstQuotaDate;

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Confirmación de Saldo</title>
    <link rel="stylesheet" href="qr.css">
  </head>

  <style>
  body {
  background: #f2f6fa;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.card.center {
  background: #ffffff;
  max-width: 460px;
  width: 100%;
  padding: 32px 28px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 20px 45px rgba(0,0,0,0.08);
}

.icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
  background: rgb(22 142 205);
}

.icon.error {
  background: #d93025;
}

.title {
  margin: 0;
  font-size: 24px;
  color: rgb(22 142 205);
}

.message {
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}

.message strong {
  color: #000;
}

.details {
  margin-top: 28px;
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.details div {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 8px;
}

.details span {
  color: #777;
}

.footer {
  margin-top: 32px;
  font-size: 12px;
  color: #888;
}

.footer span {
  font-size: 11px;
}

</style>

  <body>
    <div class="card center">
      
      <div class="icon ${valid ? "success" : "error"}">
        ${valid ? "✔" : "✖"}
      </div>

      <h1 class="title">
        ${valid ? "Confirmación de Saldo" : "Pago no válido"}
      </h1>

      <p class="message">
        ${valid
      ? `Hola <strong>${fullName}</strong>,<br/>
               te confirmamos que tu préstamo por un monto de
               <strong>${amountFormatted}</strong>,
               iniciado el <strong>${dateFormatted}</strong>,
               ha sido <strong>saldado satisfactoriamente</strong>.`
      : `No fue posible validar este comprobante de pago.
               Por favor, contacta a la institución para más información.`
    }
      </p>

      ${valid
      ? `
          <div class="details">
            <div><span>Préstamo</span><strong>#${data.loanId}</strong></div>
            <div><span>Cédula</span><strong>${data.identification}</strong></div>
          </div>
          `
      : ""
    }

      <div class="footer">
        Asociación Salas<br/>
        <span>Sistema de verificación de pagos</span>
      </div>

    </div>
  </body>
  </html>
  `;
}
