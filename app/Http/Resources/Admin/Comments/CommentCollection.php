<?php

namespace App\Http\Resources\Admin\Comments;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request as HttpRequest;

class CommentCollection extends ResourceCollection
{
    public $collects = CommentResource::class;

    public function toArray(HttpRequest $request): array
    {
        return parent::toArray($request);
    }
}
