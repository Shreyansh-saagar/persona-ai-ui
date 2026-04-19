import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-dots',
  standalone: true,
  templateUrl: './loading-dots.component.html',
  styleUrl: './loading-dots.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDotsComponent {
  readonly label = input('Loading');
}