
# DAY 3 [Redis Pub/Sub implements the messaging system]



The senders (publishers) sends the messages while the receivers (subscribers) receive them. The link by which the messages are transferred is called channel.



**publisher:**
- PUBLISH <channel_name> <message>

- PUBLISH devsnest hello

**Subscriber:**

- SUBCRIBER <channel_name>
- SUBCRIBE devsnest
WE GET THE MESSAGE 
 ```
 ("MESSAGE" , "DEVSENEST","HELLO")
```
**MULTIPLE SUBCRIPTION**
```
 PSUBSCRIBE d* (SUBCRIBE TO EVERY PUBLISHERS STARTING WITH d)
 UNSUBCRIBE devsnest //UNSUBCRIBE FROM CHANNEL
 PUNSUBSCRIBE d*
```
**Redis Streams**

- JUST LIKE STREAMING VIDEO DATA IN YOUTUBE OR WHATSAP CHATS
  WE CAN SAVE STREAM IN HISTORY PIPELINE
```
 XADD <stream_name> <ID> <KEY> <VALUE >
 XADD mystream     10000 name  mafiya
 XADD mystream     10001 name  aqua
 XADD mystream     10002 name  gabber
```
- Auto generating id (based on time stamp)
```
 XADD mystream * name laptop 
 XADD mystream * name dell
```
- limiting the VALUE 
new value add on stack and last value will deleted 
```
 XADD mystream MAXLEN 1000 * name devs
```
- Read the values form the STREAM by id
it shows all values from id 0 to 200 {count 200 = how many rows we want}
```
 XREAD COUNT 200 STREAMS mystream 0
 XREAD COUNT 2 STREAMS mystrem 1023-0
```
- Blocking for data 
In order to block, the BLOCK option is used, together with the number of milliseconds we want to block before timing out.
    
The special **$** ID.
  When blocking sometimes we want to receive just entries that are added to the stream via XADD starting from the moment we block.

```
 XREAD BLOCK 10000 STREAMS mystream 0 $
 (if there is no message in stream before 10000 mili second i.e 10sec it will block)

 XREAD BLOCK 0 STREAMS mystream 1002-0
 (it will never disconnect & all message from that id will show)
```
```
 terminal 1:
 XREAD BLOCK 10000 STREAMS mystream $
 terminal 2:
 XADD mystream * name devsnest
 ( adding data from terminal 2  to mystream which will show if it is before 10 sec  )
```
- looping through stream id
```

 XRANGE mystream    10001-0  1630334456611-0
 (XRANGE mystream  <start id>    <end id>)

 XRANGE mystream 10001-0 1630334456611-0 COUNT 3
 (count only specific{COUNT 3} rows between  <start id> <end id>)

=>if don't know start and end 
 XRANGE mystream - + COUNT 2
 (it will read from 1st to last gives first 2 values)

=>last to first 
 XREVRANGE mystream + - COUNT 2
 (it will read from last to 1st gives first 2 values)


```
