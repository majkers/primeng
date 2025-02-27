import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'auto-hide-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Tooltip is hidden when mouse leaves the target element, in cases where tooltip needs to be interacted with, set
                <i>autoHide</i> to false to change the default behavior.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-2">
            <input type="text" pInputText pTooltip="Enter your username" [autoHide]="false" placeholder="autoHide: false" />
            <input type="text" pInputText pTooltip="Enter your username" placeholder="autoHide: true" />
        </div>
        <app-code [code]="code" selector="tooltip-auto-hide-demo"></app-code>
    `
})
export class AutoHideDoc {
    code: Code = {
        basic: `<input type="text" pInputText pTooltip="Enter your username" [autoHide]="false" placeholder="autoHide: false" />
<input type="text" pInputText pTooltip="Enter your username" placeholder="autoHide: true" />`,

        html: `<div class="card flex flex-wrap justify-center gap-2">
    <input type="text" pInputText pTooltip="Enter your username" [autoHide]="false" placeholder="autoHide: false" />
    <input type="text" pInputText pTooltip="Enter your username" placeholder="autoHide: true">
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'tooltip-auto-hide-demo',
    templateUrl: './tooltip-auto-hide-demo.html',
    standalone: true,
    imports: [Tooltip, InputTextModule]
})
export class TooltipAutoHideDemo {}`
    };
}
