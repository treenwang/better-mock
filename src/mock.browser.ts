// For browser
import Handler from './lib/handler'
import * as Util from './lib/util'
import Random from './lib/random/index'
import RE from './lib/regexp/index'
import toJSONSchema from './lib/schema/index'
import valid from './lib/valid/index'
import XHR from './lib/xhr'

const Mock = {
  Handler,
  Random,
  Util,
  XHR,
  RE,
  toJSONSchema,
  valid,
  mock,
  heredoc: Util.heredoc,
  setup: (settings) => XHR.setup(settings),
  mocked: {},
  version: '__VERSION__'
}

// 避免循环依赖
if (XHR) {
  XHR.Mock = Mock
}

// Mock.mock( template )
// Mock.mock( function() )
// Mock.mock( rurl, template )
// Mock.mock( rurl, function(options) )
// Mock.mock( rurl, rtype, template )
// Mock.mock( rurl, rtype, function(options) )
// 根据数据模板生成模拟数据。
function mock (rurl, rtype, template) {
  // Mock.mock(template)
  if (arguments.length === 1) {
    return Handler.gen(rurl)
  }
  // Mock.mock(rurl, template)
  if (arguments.length === 2) {
    template = rtype
    rtype = undefined
  }
  // 拦截 XHR
  if (XHR) {
    (window.XMLHttpRequest as any) = XHR
  }
  Mock.mocked[rurl + (rtype || '')] = {
    rurl: rurl,
    rtype: rtype,
    template: template
  }
  return Mock
}

export default Mock
