import {EventEmitter}             from 'angular2/core';

export class SidebarService {
    IsSidebarVisible: boolean = false;
    public onVisibleChanged: EventEmitter<boolean> = new EventEmitter();

    ShowSidebar(): void {
        this.IsSidebarVisible = true;
        this.onVisibleChanged.next(true);
    }
    HideSidebar(): void {
        this.IsSidebarVisible = false;
        this.onVisibleChanged.next(false);
    }
}