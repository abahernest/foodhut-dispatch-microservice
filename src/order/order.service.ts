import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import {
    MonitorDispatchRequest,
} from './proto/dispatch.pb';
import { FindOrderResponseDto } from './dto/order.dto';


@Injectable()
export class OrderService implements OnModuleInit {
    @InjectRepository(Order)
    private readonly repository: Repository<Order>;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onModuleInit(): void {}

    public async updateDispatchStatus( data: MonitorDispatchRequest ) {
        const { orderId: id } = data;

        await this.repository.update(id, { dispatched: true } );
    }

    public async findOrderById( id: string): Promise<FindOrderResponseDto> {

        return await this.repository.findOne({
            where: { id },
        });

    }
}
