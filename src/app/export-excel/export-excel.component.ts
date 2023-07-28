import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {


  selectedFrequency: string;
  selectedFrequency_city: string;
  ahmedabadChecked: boolean = false;
  junagadhChecked: boolean = false;
  dailyChecked: boolean = false;
  monthlyChecked: boolean = false;
  cityNameAdi = 'Ahmedabad';
  cityNameJnd = 'Junagadh';
  dailyData = 'daily';
  monthlyData = 'monthly';
  showDownloadButton: boolean = false;
  selectedFileName: string;
  fileName: any;
  fileToUpload: File | null;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.fileToUpload = null;
  }
  ngOnInit(): void {
    console.log("Selected Frequency: ", this.selectedFrequency)
  }

  onFileSelected(fileInput: any) {
    const files = fileInput.files;
    if (files.length > 0) {
      this.fileToUpload = files[0];
      this.selectedFileName = this.fileToUpload?.name || 'No file chosen';
    } else {
      this.fileToUpload = null;
      this.selectedFileName = 'No file chosen';
    }
  }

  uploadFileAdiMonthly() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('excel_file', this.fileToUpload);
      console.log("File: ", this.fileToUpload)
      this.http.post('http://192.168.21.10:5000/excel/upload/monthly/adi', formData).subscribe((response) => {
        if (response['status'] === 200) {
          console.log('File uploaded successfully!', response);
          this.showDownloadButton = true
          this.fileName = response['fileName']
          this.toastr.success(response['message']);
        } else {
          console.log('Unexpected error occurred', response);
          this.toastr.success(response['message']);
        }
      }
      );
    } else {
      console.log('Please select a file to upload.');
      this.toastr.error('Please select a file to upload.');
    }
  }

  uploadFileAdiDaily() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('excel_file', this.fileToUpload);
      console.log("File: ", this.fileToUpload)
      this.http.post('http://192.168.21.10:5000/excel/upload/daily/adi', formData).subscribe((response) => {
        if (response['status'] === 200) {
          console.log('File uploaded successfully!', response);
          this.showDownloadButton = true
          this.fileName = response['fileName']
          this.toastr.success(response['message']);
        } else {
          console.log('Unexpected error occurred', response);
          this.toastr.success(response['message']);
        }
      }
      );
    } else {
      console.log('Please select a file to upload.');
      this.toastr.error('Please select a file to upload.');
    }
  }

  uploadFileJndMonthly() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('excel_file', this.fileToUpload);
      console.log("File: ", this.fileToUpload)
      this.http.post('http://192.168.21.10:5000/excel/upload/monthly/jnd', formData).subscribe((response) => {
        if (response['status'] === 200) {
          console.log('File uploaded successfully!', response);
          this.showDownloadButton = true
          this.fileName = response['fileName']
          this.toastr.success(response['message']);
        } else {
          console.log('Unexpected error occurred', response);
          this.toastr.success(response['message']);
        }
      }
      );
    } else {
      console.log('Please select a file to upload.');
      this.toastr.error('Please select a file to upload.');
    }
  }

  uploadFileJndDaily() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('excel_file', this.fileToUpload);
      console.log("File: ", this.fileToUpload)
      this.http.post('http://192.168.21.10:5000/excel/upload/daily/jnd', formData).subscribe((response) => {
        if (response['status'] === 200) {
          console.log('File uploaded successfully!', response);
          this.showDownloadButton = true
          this.fileName = response['fileName']
          this.toastr.success(response['message']);
        } else {
          console.log('Unexpected error occurred', response);
          this.toastr.success(response['message']);
        }
      }
      );
    } else {
      console.log('Please select a file to upload.');
      this.toastr.error('Please select a file to upload.');
    }
  }

  // uploadFileJnd() {
  //   if (this.fileToUpload) {
  //     const formData = new FormData();
  //     formData.append('excel_file', this.fileToUpload);
  //     console.log("File: ", this.fileToUpload)
  //     this.http.post('http://192.168.21.10:5000/excel/upload/jnd', formData).subscribe((response) => {
  //       if (response['status'] === 200) {
  //         console.log('File uploaded successfully!', response);
  //         this.showDownloadButton = true
  //         this.fileName = response['fileName']
  //         this.toastr.success(response['message']);
  //       } else {
  //         console.log('Unexpected error occurred', response);
  //         this.toastr.success(response['message']);
  //       }
  //     }
  //     );
  //   } else {
  //     console.log('Please select a file to upload.');
  //     this.toastr.error('Please select a file to upload.');
  //   }
  // }

  downloadFile() {
    if (this.fileName) {
      this.exportReqBody(this.fileName);
    }
  }


  exportReqBody(filename: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    return this.http.get(`http://192.168.21.10:5000/excel/download/` + this.fileName, {
      responseType: 'arraybuffer',
      headers: header
    }).subscribe(response => {
      this.downLoadFile(response, fileType, filename, '.xlsx');
    });
  }

  downLoadFile(data: any, type: string, filename: string, fileExe: string) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename + fileExe;
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
