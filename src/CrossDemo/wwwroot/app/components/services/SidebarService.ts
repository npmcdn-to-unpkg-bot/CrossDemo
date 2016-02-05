export class SidebarService {
    IsSidebarVisible: boolean = false;

    ShowSidebar(): void {
        this.IsSidebarVisible = true;
    }
    HideSidebar(): void {
        this.IsSidebarVisible = false;
    }
}