import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../components/molecules/navigation/navigation.component';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  standalone: true,
  selector: 'main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
})
export class MainLayoutComponent {
  public navigationService = inject(NavigationService);

  // Expor o signal do serviço
  get navigationDirection() {
    return this.navigationService.navigationDirection;
  }
}
