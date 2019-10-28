import { Vue } from 'vue/types/vue';
import { createDecorator } from 'vue-class-component';
import { ComponentOptions } from 'vue/types/options';

export function Inject<T>(service?:symbol) {
  return function (proto: Vue, key: string) {
    return createDecorator((options: ComponentOptions<Vue> & { __container_injected__?: true }, key) => {

      if (!options.__container_injected__) {
        options.mixins = options.mixins || []
        options.mixins.push({
          inject: ["$kernel"]
        })

        options.__container_injected__ = true
      }

      options.computed = options.computed || {}

      options.computed[key] = function (this: any) {
        return (this["$kernel"]).get(service)
      }
    })(proto, key)
  }
}