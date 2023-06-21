import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from 'src/app/models/image';
import { UserView } from 'src/app/models/user-view';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { Buffer} from 'buffer';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  userInfo: UserView = new UserView();
  avatarUrl: any;
  public selectedFile: File;
  editingEnabled: boolean = false;
  @Input() imageModel: ImageModel = new ImageModel();
  gowno: any;
  constructor(
    private accountService: AccountService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.updateInfo();
  }

  enableEditing() {
    this.editingEnabled = true;
  }

  saveChanges() {
    this.accountService.updateUser(this.userInfo).subscribe(response => {});
  }
  Uint8ArrayToString(array: Uint8Array): string {
    let str = '';
    for (let i = 0; i < array.length; ++i) {
      str += String.fromCharCode(array[i]);
    }
    return str;
  }
  updateInfo() {
    this.accountService.getActiveUser().subscribe(response => {
      this.userInfo = response;
    });
    
    this.accountService.getAvatar().subscribe(response => {
      this.imageModel = response;
      console.log(response.pic);
      this.gowno = btoa(this.Uint8ArrayToString(this.imageModel.pic));
      //const imageUrl = 'data:image/jpeg;base64,' + gowno;
    
      //this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      //console.log(this.avatarUrl);
    });
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.userInfo.avatar)
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.avatarUrl = reader.result;
      
    };
  
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile);
    this.accountService.updateUserAvatar(uploadData);
    console.log(this.selectedFile)
    
  }
}