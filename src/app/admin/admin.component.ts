import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private bookForm: FormGroup;
  private image:any;
  private file:any;
   loading: boolean = false;
  private books = firebase.firestore().collection('books');

  constructor(private fb: FormBuilder, private router: Router) { 
  }

  ngOnInit() {
    this.createBookForm();

  }

  onImageChange($event){
    const validTypes = ["image/gif", "image/jpeg", "image/png"];
    if($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      const type = file.type;
      if(!validTypes.find(element => element === type )){
        this.imageUrl.setValue(null);
        console.error("Formato de Imagen no valido");
        return; 
      }
      this.image = file;
      // console.log(file);
    }
  }
  onFileChange($event){
    if($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.file = file;
      // console.log(file);
    }
  }

  createBookForm() {
    this.bookForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(144)] ],
      resumen: ['', [Validators.required, Validators.maxLength(333)]],
      downloadUrl: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
    });
  }

  onSubmit(){

    // console.log(this.bookForm.value);
    this.loading = true;

    this.uploadImageAndFile()
      .then((response) => {
          const book = {
            titulo: this.title.value,
            resumen: this.resumen.value,
            downloadUrl: response.fileUrl,
            imageUrl: response.imgUrl
          }

          // console.log('Book to post', book);
          
          this.books.add(book)
            .then((docRef) =>{
              swal("Bien!", "Libro agregado!", "success");
              // console.log("Document written with ID: ", docRef.id);
              this.router.navigate(['']);
            })
            .catch((error) => {
              swal("Error!", "Error agregando el libro!", "error");
              console.error("Error adding document: ", error);
            });
          this.bookForm.reset();
          this.loading = false;
      })
      .catch(error => {
          console.error(error);
          this.loading = false;
      });   
  }

  async uploadImageAndFile(){
    try {
      const taskIm = await this.upload(this.image, "image");
      const taskFile = await this.upload(this.file, "file");
      return {
        imgUrl: taskIm,
        fileUrl: taskFile
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async upload(file, tipo){
    const ref = firebase.storage().ref();
    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type };
    const task = ref.child(name).put(file, metadata);

    return task.then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
          // console.log(url);
          return url;
        })
        .catch((error) => {
          //swal("Error!", "Lo sentimos ocurrio un error al subir el archivo, intente una vez mas", "error");
          console.error('error en upload ',error);

          /* if(tipo==='image')
            this.imageUrl.setValue(null);

          if(tipo==='file')
            this.downloadUrl.setValue(null); */

          throw new Error(error);
        });
  }


  get title(){
    return this.bookForm.get('titulo');
  }
  get resumen(){
    return this.bookForm.get('resumen');
  }
  get downloadUrl(){
    return this.bookForm.get('downloadUrl');
  }
  get imageUrl(){
    return this.bookForm.get('imageUrl');
  }

  get tituloInvalid(){
    return this.title.invalid && (this.title.dirty || this.title.touched);
  }
  get resumenInvalid(){
    return this.resumen.invalid && (this.resumen.dirty || this.resumen.touched);
  }
  get downloadUrlInvalid(){
    return this.downloadUrl.invalid && (this.downloadUrl.dirty || this.downloadUrl.touched);
  }
  get imageUrlInvalid(){
    return this.imageUrl.invalid && (this.imageUrl.dirty || this.imageUrl.touched);
  }

}
