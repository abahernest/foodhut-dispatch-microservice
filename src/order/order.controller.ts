import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { DISPATCH_SERVICE_NAME, MonitorDispatchRequest, MonitorDispatchResponse } from './proto/dispatch.pb';
import { CronService } from './clock';

@Controller('order')
export class OrderController {
    @Inject(OrderService)
    private readonly service: OrderService;

    @Inject(CronService)
    private readonly cronService: CronService;


    @GrpcMethod(DISPATCH_SERVICE_NAME, 'MonitorDispatch')
    private async monitorDispatch( data: MonitorDispatchRequest ): Promise<MonitorDispatchResponse> {
        const order = await this.service.findOrderById(data.orderId);

        if (!order) {
            const emptyOrder: MonitorDispatchResponse = {
                code: 400,
                message: 'resource not found',
            };
            return emptyOrder;
        }

        this.cronService.setOrderToDispatched( data)

        return {
            code: 200,
            message: 'success',
        }
    };
}

