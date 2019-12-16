const request = require('request');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ 'async': true, 'attrkey': '@', 'explicitArray': false });

function calculateCorreiosShipping(cep, code = '40010') {
  /*
    código do serviço.
    40010 SEDEX
    41106 PAC
    http://www.correios.com.br/webServices/PDF/SCPP_manual_implementacao_calculo_remoto_de_precos_e_prazos.pdf
  */
  const options = {
    uri: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx',
    method: 'GET',
    qs: {
      nCdEmpresa: '',
      sDsSenha: '',
      sCepOrigem: '38413096',
      sCepDestino: cep,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '5',
      nVlLargura: '13',
      nVlDiametro: '0',
      sCdMaoPropria: 's',
      nVlValorDeclarado: '200',
      sCdAvisoRecebimento: 'n',
      StrRetorno: 'xml',
      nCdServico: code
    }
  };

  return new Promise(resolve => {
    request(options, (error, response, body) => {
      if (error) {
        return console.log('Erro ', error);
      }

      parser.parseString(body, (err, xml) => {
        if (err) {
          return console.log('Erro ', err);
        }

        const price = xml.Servicos.cServico.Valor

        resolve(price)
      })
    })
  })
}

async function shipping (req, res) {
  const cep = req.params.cep

  const sedexPrice = await calculateCorreiosShipping(cep, '40010')
  const pacPrice = await calculateCorreiosShipping(cep, '41106')

  res.json({ sedexPrice, pacPrice })
}

module.exports = {
  shipping
}