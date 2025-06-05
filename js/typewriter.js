class TypeWriter {
    constructor(element, options) {
        this.element = element;
        this.text = options.text || '';
        this.delay = options.delay || 100;
        this.currentChar = 0;
    }
    
    start() {
        this.textElement = this.element;
        this.type();
    }
    
    type() {
        if (this.currentChar < this.text.length) {
            this.textElement.textContent += this.text.charAt(this.currentChar);
            this.currentChar++;
            setTimeout(() => this.type(), this.delay);
        }
    }
}