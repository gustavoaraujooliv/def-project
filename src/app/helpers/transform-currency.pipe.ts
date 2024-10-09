import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'transformCurrency'
})
export class TransformCurrencyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return 'Valor inválido';
    }
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'NAP ' + formattedValue;
  }
}