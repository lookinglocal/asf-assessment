function FormCtrl () {
  this.schema = {
    type: 'object',
    properties: {
      fullname: {
        title: 'Full name',
        type: 'string'
      },
      firstName: {
        title: 'First name',
        type: 'string'
      },
      lastName: {
        title: 'Last name',
        type: 'string'
      },
      address: {
        title: 'Address',
        type: 'string'
      },
      uprn: {
        title: 'UPRN',
        type: 'string'
      }
    },
    required: ['fullname']
  }
  this.form = [
    {
      key: 'fullname',
      type: 'nameSplitter' // using custom addOn
    },
    {
      key: 'firstName',
      readonly: true
    },
    {
      key: 'lastName',
      readonly: true
    },
    'address',
    {
      key: 'uprn',
      readonly: true
    }
  ]
  this.model = {}
  this.isModelVisible = false
}

export default FormCtrl
