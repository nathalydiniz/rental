async function getRentalContractData() {
    let contractNumberField = document.getElementById("contractNumber");
    const userInput = contractNumberField.value * 1;
    alert("valorInformadoPeloUsuario: " + userInput);
    try {
      const arrayDonationData = await smartContract.donation(userInput);
      console.log(arrayDonationData);
      //Modo mais verboso
      let showDoador = document.getElementById("doador");
      showDoador.innerText = arrayDonationData[0];
      //Modo sintetico onde se concatena um comando junto a outro na mesma linha
      document.getElementById("donation").innerText = arrayDonationData[1];
      document.getElementById("addressdoacao").innerText = arrayDonationData[2];
      document.getElementById("donationValue").innerText = arrayDonationData[3];
    } catch (err) {
      console.error(err);
      document.getElementById("doador").innerText = "";
      document.getElementById("donatario").innerText = "";
      document.getElementById("addressdoacao").innerText = "";
      document.getElementById("donationValue").innerText = "";
      contractNumberField.value = 0;
      alert("Houve um erro ao buscar o contrato de numero: " + userInput);
    }
  }
  
  async function autoLoadOwner() {
    try {
      const contractOwner = await smartContract.owner();
      console.log(contractOwner);
      document.getElementById("spanOwner").innerText = contractOwner;
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao buscar o proprietário do contrato");
    }
  }
  
  async function saveFormData() {
    try {
      var tx;
      var txReceipt;
      tx = await smartContractWithSigner.registerDonation(
        document.frmImovel.paramDoador.value,
        document.frmImovel.paramDonatario.value,
        document.frmImovel.paramAddressDoacao.value,
        document.frmImovel.paramDonationValue.value
      );
      console.log("transacao enviada ao metamask. pendente...", tx);
      alert("Transação enviada... " + tx.hash + " aguarde a confirmação da Blockcnain...");
      txReceipt = await tx.wait();
      console.log("transacao processada...", txReceipt);
      if (txReceipt.status == 1) {
        alert("Transação processada: " + tx.hash + "  - Registro salvo na Blockchain. Status: " + txReceipt.status);
      } else {
        alert("Transação processada: " + tx.hash + "  - Mas houve um erro na blockchain. Veja pelo etherscan");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao salvar o registro do contrato de aluguel");
    }
  }
