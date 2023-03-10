import { CronJob } from 'cron';
import { Inject, Injectable } from '@nestjs/common';
import { OrderService } from './order.service';
import { MonitorDispatchRequest } from './proto/dispatch.pb';

@Injectable()
export class CronService {
    @Inject(OrderService)
    private readonly service: OrderService;


    public async setOrderToDispatched( data: MonitorDispatchRequest ): CronJob {

        return new CronJob(
            '7 * * * *', // cron job runs 7 mins after it's called
            async () => this.service.updateDispatchStatus( data ),
            null,
            true,
            'Africa/Lagos',
        );
    }


}