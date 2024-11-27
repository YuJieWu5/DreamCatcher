import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {DreamCatcherProxyServiceService} from '../dream-catcher-proxy-service.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent {
  reviews: any[];
  sceneData ={
    sceneId: ''
  };
  newReview = {
    userName: '',
    rating: '',
    comment: ''
  };
  message: string = "";
  showAddReviewForm = false;
  constructor(
    private proxy$: DreamCatcherProxyServiceService,
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviews = data.reviews || []; // 确保有默认值
    this.sceneData = data.sceneData;
  }

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent() {
    // 在这里编写你需要执行的逻辑
    console.log('Component initialized');
    // 例如，获取数据、设置初始状态等

    const sceneId = this.sceneData.sceneId;
    if (sceneId) {
      this.proxy$.getReview(sceneId).subscribe(response => {
        if (response['success']) {
          this.reviews = response['data'];
          // 用户已登录，打开评论对话框
          // const reviewDialogRef = this.dialog.open(ReviewDialogComponent, {
          //   width: '800px',
          //   data: { reviews: this.reviews, sceneData: this.data },
          //   panelClass: 'custom-dialog-container',
          //   hasBackdrop: true
          // });
        }else {

        }
      });
    }
  }

  onAddReview(): void {

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.dialogRef.close();
      // 用户未登录，跳转到登录页面
      this.router.navigate(['/login']);
    }else {
      // 实现添加评论的逻辑
      this.showAddReviewForm = !this.showAddReviewForm;
    }


  }

  onClose(): void {
    this.dialogRef.close(null); // 关闭对话框，不传回任何数据
    this.showAddReviewForm = !this.showAddReviewForm;
    this.dialogRef.close(null); // 关闭对话框，不传回任何数据

    // 延迟1秒后关闭对话框
    setTimeout(() => {
      this.dialogRef.close(null);
    }, 1);

    setTimeout(() => {
      this.dialogRef.close(null);
    }, 10);
  }


  submitReview() {
    if (this.isValidReview()) {

      let userName: string;
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        userName = storedUserName;
      } else {
        userName = 'defaultUserName';
      }

      let userId: string;
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        userId = storedUserId;
      } else {
        userId = 'defaultUserName';
      }


      const data: Record<string, string> ={
        sceneId: this.sceneData.sceneId,
        userId: userId,
        userName: userName,
        rating : this.newReview.rating,
        comment : this.newReview.comment
      }

      this.proxy$.addReview(data).subscribe((result: Record<string, any>)=>{
        console.log(result);
        const success = result && result['success'] ? result['success'] : "";
        if(success == true){
          this.reviews.push(this.newReview); // 添加新评论到列表
          this.newReview = { userName: '', rating: '', comment: '' }; // 重置表单
          this.showAddReviewForm = false; // 隐藏表单
        }else{
          this.message =result['message'];
        }
      })
    }
  }

  isValidReview() {
    let userName: string;
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      userName = storedUserName;
    } else {
      userName = 'defaultUserName';
    }
    this.newReview.userName = userName;
    return this.newReview.rating.trim() !== '' &&
      this.newReview.comment.trim() !== '';
  }
}
