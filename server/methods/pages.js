import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {Pages} from '/libs/collections'

Meteor.methods({
  'page.save'(page) {
    check(page, Object)
    Pages.update({title: page.title}, page)
  },

  'page.delete'(page) {
    check(page, Object)
    Pages.remove({title: page.title})
  },

  'page.addElement'(name, pageTitle, index, order) {
    check(name, String)
    check(pageTitle, String)
    check(index, Number)
    check(order, String)

    let oldPage = Pages.findOne({title: pageTitle})

    let elements = oldPage.elements;

    elements.splice(index + 1, 0, {
      component: name,
      data: {}
    });

    oldPage.elements = elements;

    Pages.update({title: pageTitle}, oldPage)
  },

  'page.add'(title) {
    check(title, String)
    if (Pages.findOne({title})) {
      console.log('Page with that name exists already');
      return
    }
    Pages.insert({
      title,
      elements: []
    })
  }
})