const formatString = (string) => {

    const htmlString = string;

    // Parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Get the text content without the <a> tag
    const textContent = doc.body.textContent;

    const formattedText = textContent.replace(/_/g, ' ');

    return formattedText;

}

const convertGBPtoCAD = (priceInGBP) => {
    // Assuming a fixed exchange rate
    const exchangeRate = 1.28; // Replace with the actual exchange rate
  
    // Remove the pound symbol and convert to a float
    const priceNumeric = parseFloat(priceInGBP.replace('£', '').replace(',', ''));
  
    // Convert to USD
    const priceInUSD = (priceNumeric * exchangeRate).toFixed(2);
  
    return `$${priceInUSD}`;

  };

  const convertYENtoCAD = (priceInYEN) => {

    const exchangeRate = 0.0069; // Replace with the actual exchange rate
  
    // Remove the pound symbol and convert to a float
    const priceNumeric = parseFloat(priceInYEN.replace('￥', '').replace(',', ''));
  
    // Convert to USD
    const priceInUSD = (priceNumeric * exchangeRate).toFixed(2);
  
    return `$${priceInUSD}`;

  }

  export {
    formatString,
    convertGBPtoCAD, 
    convertYENtoCAD
  };