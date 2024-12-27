import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDate',
  standalone: false
})
export class TaskDatePipe implements PipeTransform {
  transform(value: Date): string {
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: '2-digit',
    });
  }
}
