import { Code } from '@/domain/code';
import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'expandable-row-group-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>When <i>expandableRowGroups</i> is present in subheader based row grouping, groups can be expanded and collapsed. State of the expansions are controlled using the <i>expandedRows</i> and <i>onRowToggle</i> properties.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="customers" sortField="representative.name" sortMode="single" dataKey="representative.name" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{ 'min-width': '70rem' }">
                    <ng-template #header>
                        <tr>
                            <th style="width:20%">Name</th>
                            <th style="width:20%">Country</th>
                            <th style="width:20%">Company</th>
                            <th style="width:20%">Status</th>
                            <th style="width:20%">Date</th>
                        </tr>
                    </ng-template>
                    <ng-template #groupheader let-customer let-rowIndex="rowIndex" let-expanded="expanded">
                        <tr>
                            <td colspan="5">
                                <button type="button" pButton pRipple [pRowToggler]="customer" text rounded plain class="mr-2" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></button>
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle; display: inline-block" />
                                <span class="font-bold ml-2">{{ customer.representative.name }}</span>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #groupfooter let-customer>
                        <tr class="p-rowgroup-footer">
                            <td colspan="4" style="text-align: right">Total Customers</td>
                            <td>{{ calculateCustomerTotal(customer.representative.name) }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #expandedrow let-customer>
                        <tr>
                            <td>
                                {{ customer.name }}
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                    <span>{{ customer.country.name }}</span>
                                </div>
                            </td>
                            <td>
                                {{ customer.company }}
                            </td>
                            <td>
                                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                            </td>
                            <td>
                                {{ customer.date }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-expandable-row-group-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandableRowGroupDoc {
    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
    }

    code: Code = {
        basic: `<p-table [value]="customers" sortField="representative.name" sortMode="single" dataKey="representative.name" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{'min-width': '70rem'}">
    <ng-template #header>
        <tr>
            <th style="width:20%">Name</th>
            <th style="width:20%">Country</th>
            <th style="width:20%">Company</th>
            <th style="width:20%">Status</th>
            <th style="width:20%">Date</th>
        </tr>
    </ng-template>
    <ng-template #groupheader let-customer let-rowIndex="rowIndex" let-expanded="expanded">
        <tr>
            <td colspan="5">
                <button
                    type="button"
                    pButton
                    pRipple
                    [pRowToggler]="customer"
                    text
                    rounded
                    plain
                    class="mr-2"
                    [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'">
                </button>
                <img
                    [alt]="customer.representative.name"
                    src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{customer.representative.image}}"
                    width="32"
                    style="vertical-align: middle; display: inline-block" />
                <span class="font-bold ml-2">{{customer.representative.name}}</span>
            </td>
        </tr>
    </ng-template>
    <ng-template #groupfooter let-customer>
        <tr class="p-rowgroup-footer">
            <td colspan="4" style="text-align: right">Total Customers</td>
            <td>{{calculateCustomerTotal(customer.representative.name)}}</td>
        </tr>
    </ng-template>
    <ng-template #expandedrow let-customer>
        <tr>
            <td>
                {{customer.name}}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                {{customer.company}}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                {{customer.date}}
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="customers" sortField="representative.name" sortMode="single" dataKey="representative.name" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{'min-width': '70rem'}">
        <ng-template #header>
            <tr>
                <th style="width:20%">Name</th>
                <th style="width:20%">Country</th>
                <th style="width:20%">Company</th>
                <th style="width:20%">Status</th>
                <th style="width:20%">Date</th>
            </tr>
        </ng-template>
        <ng-template #groupheader let-customer let-rowIndex="rowIndex" let-expanded="expanded">
            <tr>
                <td colspan="5">
                    <button
                        type="button"
                        pButton
                        pRipple
                        [pRowToggler]="customer"
                        text
                        rounded
                        plain
                        class="mr-2"
                        [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'">
                    </button>
                    <img
                        [alt]="customer.representative.name"
                        src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{customer.representative.image}}"
                        width="32"
                        style="vertical-align: middle; display: inline-block" />
                    <span class="font-bold ml-2">{{customer.representative.name}}</span>
                </td>
            </tr>
        </ng-template>
        <ng-template #groupfooter let-customer>
            <tr class="p-rowgroup-footer">
                <td colspan="4" style="text-align: right">Total Customers</td>
                <td>{{calculateCustomerTotal(customer.representative.name)}}</td>
            </tr>
        </ng-template>
        <ng-template #expandedrow let-customer>
            <tr>
                <td>
                    {{customer.name}}
                </td>
                <td>
                    <div class="flex items-center gap-2">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                        <span>{{ customer.country.name }}</span>
                    </div>
                </td>
                <td>
                    {{customer.company}}
                </td>
                <td>
                    <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                </td>
                <td>
                    {{customer.date}}
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'table-expandable-row-group-demo',
    templateUrl: 'table-expandable-row-group-demo.html',
    standalone: true,
    imports: [TableModule, HttpClientModule, ButtonModule, Ripple, Tag],
    providers: [CustomerService],
    styles: [
        \`:host ::ng-deep .p-rowgroup-footer td {
            font-weight: 700;
        }

        :host ::ng-deep .p-rowgroup-header {
            span {
                font-weight: 700;
            }

            .p-row-toggler {
                vertical-align: middle;
                margin-right: .25rem;
            }
        }\`
    ],
})
export class TableExpandableRowGroupDemo implements OnInit{
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
    }
}`,
        scss: `
:host ::ng-deep .p-rowgroup-footer td {
    font-weight: 700;
}

:host ::ng-deep .p-rowgroup-header {
    span {
        font-weight: 700;
    }

    .p-row-toggler {
        vertical-align: middle;
        margin-right: .25rem;
    }
}`,
        data: `{
    id: 1000,
    name: 'James Butt',
    country: {
        name: 'Algeria',
        code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
    },
    balance: 70663
},
...`,
        service: ['CustomerService']
    };

    extFiles = [
        {
            path: 'src/domain/customer.ts',
            content: `
export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`
        }
    ];
}
