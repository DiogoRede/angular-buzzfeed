import { Component, OnInit } from '@angular/core';
import quizz from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', './quizz.responsive.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = 'Pergunta';

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string = '';

  questionIndex:number    = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz){
      this.finished = false;
      this.title = quizz.title;
      this.questions = quizz.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  choose(value:string){
    this.answers.push(value);
    this.nextStep();
  }

  async backStep(){
    this.answers.pop();
    this.questionIndex--;
    if(this.questionIndex<this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz.results[finalAnswer as keyof typeof quizz.results];
    }
  }
  
  async nextStep(){
    this.questionIndex++;
    if(this.questionIndex<this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz.results[finalAnswer as keyof typeof quizz.results];
    }
  }

  async checkResult(answers:string[]){
    const results = answers.reduce((p,c,i,arr)=>{
      if(arr.filter(item => item === p).length > arr.filter(item => item === c).length){
        return p;
      }else{
        return c;
      }
    });
    return results;
  }

}