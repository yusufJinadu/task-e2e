export default class SignUpModal {
    constructor(){
        this._modalContent = '.content'
        this._statisticsSignUpButton = '[ng-show="showStatisticsModal"] > .wrapper > .content > .info > .info-content > .button'
        this._statisticsTeaserImage = '[ng-show="showStatisticsModal"] > .wrapper > .content > .info > .info-content  .teaser'
    }

    getModalContent(){
        return this._modalContent
    }

    getStatisticsSignUpButton(){
        return  this._statisticsSignUpButton
    }

    getStatisticsTeaserImage(){
        return this._statisticsTeaserImage
    }

    goToSignUpPage(trigger = 'button'){
        if(trigger == 'button'){
            cy.get(this.getStatisticsSignUpButton()).contains('Free Sign Up').click()
        }
        else{
            cy.log('got here')
            cy.get(this.getStatisticsTeaserImage()).click()
        }
    }
}