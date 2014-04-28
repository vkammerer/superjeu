
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var AnswerSchema = new Schema({
	answerlabel: String,
	iscorrect : Boolean
})

var QuestionSchema = new Schema({
	questionlabel: String,
	user: {type : Schema.ObjectId, ref : 'User'},
	answers : [AnswerSchema]
})
var QuestionsetSchema = new Schema({
	questionsetlabel: String,
	questions : [{type : Schema.ObjectId, ref : 'Question'}]
})

AnswerSchema.path('answerlabel').validate(function (answerlabel) {
  return answerlabel.length
}, 'Answer cannot be blank')

QuestionSchema.path('questionlabel').validate(function (questionlabel) {
	if (questionlabel) {
		return questionlabel.length		
	}
	else return false;
}, 'Question cannot be blank')
QuestionsetSchema.path('questionsetlabel').validate(function (questionsetlabel) {
	if (questionsetlabel) {
		return questionsetlabel.length		
	}
	else return false;
}, 'Questionset cannot be blank')

mongoose.model('Question', QuestionSchema)
mongoose.model('Questionset', QuestionsetSchema)