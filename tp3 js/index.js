const prompt = require('prompt-sync')();

class Calculadora {
  constructor() {
    this.a = 0;
    this.b = 0;
    this.operacion = "";
  }

  // Métodos de operaciones
  suma(a, b) {
    return a + b;
  }

  resta(a, b) {
    return a - b;
  }

  multiplicacion(a, b) {
    return a * b;
  }

  division(a, b) {
    if (b === 0) {
      return "Error: División por cero";
    }
    return a / b;
  }

  // Método principal para ejecutar la calculadora
  ejecutar() {
    let continuar;
    do {
      console.log("\n=== Calculadora ===");
      this.a = Number(prompt("Elige tu primer número: "));
      this.operacion = prompt("Elige la operación (+, -, *, /): ");
      this.b = Number(prompt("Elige tu segundo número: "));

      let resultado;

      switch (this.operacion) {
        case "+":
          resultado = this.suma(this.a, this.b);
          break;
        case "-":
          resultado = this.resta(this.a, this.b);
          break;
        case "*":
          resultado = this.multiplicacion(this.a, this.b);
          break;
        case "/":
          resultado = this.division(this.a, this.b);
          break;
        default:
          resultado = "Operación no válida";
      }

      console.log("Resultado:", resultado);
      continuar = Number(prompt("¿Deseas realizar otra operación? (0 = sí, 1 = no): "));
    } while (continuar === 0);

    console.log("¡Gracias por usar la calculadora! :)");
  }
}

// Crear e iniciar la calculadora
const miCalculadora = new Calculadora();
miCalculadora.ejecutar();
