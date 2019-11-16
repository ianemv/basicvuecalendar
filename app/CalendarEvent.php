<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    //
    protected $fillable =['title', 'event_date'];
    protected $table = 'calendar_events';

}
