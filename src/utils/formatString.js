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

export default formatString;